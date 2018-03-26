import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  studentlist;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toastCtrl: ToastController) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  getData() {
    this.sqlite.create({
      name: 'studentdata.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM studentdetail ORDER BY rowid DESC', {})
        .then(res => {
          this.studentlist = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.studentlist.push({
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
  detailpage(selectedid){
    this.navCtrl.push("DetailPage", {
      param: selectedid
    });
  }
}
