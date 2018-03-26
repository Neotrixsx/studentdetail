import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  parameter;
  studentdetail;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toastCtrl: ToastController) {
    this.parameter = navParams.get('param');
    this.getdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  getdata() {
    this.sqlite.create({
      name: 'studentdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM studentdetail  WHERE rowid=?', [this.parameter])
        .then(res => {
          this.studentdetail = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.studentdetail.push({
              rowid: res.rows.item(i).id,
              name: res.rows.item(i).name,
              birthday: res.rows.item(i).birthday,
              age: res.rows.item(i).age,
              imgSrc: res.rows.item(i).image,
              qualification: res.rows.item(i).qualification,             
              gender: res.rows.item(i).gender
            })
          }
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
