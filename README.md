# NanoSQLTest
A test of NanoSQL that throws an exception while rebuilding secondary indexes on tables. This is based on one of the ionic starter projects, "tabs", and the home screen has been modified to integrate nanoSQL into the project.

Steps to reproduce:
 - Clone this project
 - Run #npm install
 - Run #ionic cordova run android
    -This will build and then run the project to run on a native Android device. 
    - The first time it runs it will populate the database with records. This part should work fine and the app will show status and recordcount on the home screen.
    - Kill the app. Then, relaunch it on your Android device. It is called "NanoSQLTest2".
    - Subsequent runs on device die when trying to connect to the database. With your Android device connected to a computer, open up Chrome on the computer and go to "chrome://inspect" - choose *inspect* next to the running instance of this app.
    - There will be an error message, *Unhandled Promise rejection: Cannot read property 'push' of undefined* displayed in Chrome's debugging tools.

![Chrome Debugging Error](https://github.com/phydiux/NanoSQLTest/raw/master/images/Chrome_Debugging_Failure.png)
