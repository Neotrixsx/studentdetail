
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "HomePage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.sqlite.create({
        name: 'studentdata.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS studentdetail(id INTEGER PRIMARY KEY,name TEXT, birthday TEXT, age TEXT, image TEXT,qualification TEXT ,gender TEXT )', {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
  }
}

