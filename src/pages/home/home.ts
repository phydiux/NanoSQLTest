import { DataProvider } from './../../providers/data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  subId: number = 2;
  defaultSubData: any[] = [
    {
      "guid": "993a5c6a-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "993fbad4-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "9945192a-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "994a7f5f-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "995051ec-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "9955af00-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "995b1120-e97e-11e6-bd86-42010a800360"
    },
    {
      "guid": "99607132-e97e-11e6-bd86-42010a800360"
    }
  ];
  querymessage: string = "";
  results: any;

  constructor(
    public navCtrl: NavController,
    public dataProvider: DataProvider
  ) {

  }

  ionViewWillEnter() {
    this.querymessage = "Querying...";
    this.dataProvider.getSubLotsBySubId(this.subId).subscribe((result) => {
      console.log('Result count? ' + result.length);
      if (result.length == 0) {
        this.querymessage = "No existing records, creating new ones.";
        // Initialize some data.
        this.dataProvider.upsertSubLots(this.subId, this.defaultSubData).subscribe(() => {
          console.log('loaded ' + this.defaultSubData.length + ' lots for subId ' + this.subId);

          this.dataProvider.getSubLotsBySubId(this.subId).subscribe((result) => {
            console.log('re-query for lots after load returned ' + result.length + ' rows.');
            this.results = result;
          });
        });
      } else {
        this.querymessage = "Records existed, returning them.";
        this.results = result;
      }

    });
  }

}
