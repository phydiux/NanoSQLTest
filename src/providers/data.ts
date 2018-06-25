import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getMode } from "cordova-plugin-nano-sqlite/lib/sqlite-adapter";
import { nSQL, NanoSQLInstance } from "nano-sql";

let cordova: any;

@Injectable()
export class DataProvider {

    constructor(private platform: Platform) {
        console.log('SQLite DataProvider instantiated.');

        // this.platform.ready().then(() => {
        document.addEventListener(typeof cordova !== "undefined" ? "deviceready" : "DOMContentLoaded", () => {

            nSQL().onConnected(() => {
                console.log(Math.round(new Date().getTime() / 1000).toString() + ' SQLite database connected.');
            });

            nSQL('TestTable').model([
                { key: 'id', type: 'int', props: ['pk', 'ai'] },
                { key: 'subId', type: 'int', props: ['idx'] }, // 
                { key: 'guid', type: 'string' },
                { key: 'updateTs', type: 'number' },
            ])
                .config({
                    id: "TestDatabase",
                    mode: getMode() // required
                }).connect();
        });
    }

    public upsertSubLots(subid: number, data: any[]): Observable<any> {
        return Observable.create(observer => {
            console.log(Math.round(new Date().getTime() / 1000).toString() + ' Upsert data for subId ' + subid + ' started.');
            data.map(d => {
                d.subId = subid;
                d.updateTs = new Date(Date.now()).getTime();
            });

            nSQL('TestTable').loadJS('TestTable', data, true).then(() => {
                setTimeout(() => {
                    console.log(Math.round(new Date().getTime() / 1000).toString() + ' Upsert data for subId ' + subid + ' with ' + data.length + ' lots completed.');
                    observer.next(true);
                }, 500);
            });
        });
    }

    public getSubLotsBySubId(subId: number): Observable<any> {
        return Observable.create(observer => {
            console.log('getting lots for subId!: ' + subId);
            nSQL('TestTable').query("select").where(['subId', '=', subId]).exec().then((result) => {
                observer.next(result);
            });
        });
    }


}