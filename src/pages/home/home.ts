import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import moment from 'moment';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name;
  birthdate;
  age;
  qualification;
  imgSrc;
  termvalue;
  gender;
  base64Image;

  dtDateISO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public actionsheetCtrl: ActionSheetController, public sqlite: SQLite, public toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Take Image',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Photo Library',
          handler: () => {
            this.takePhoto(0);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePhoto(1);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
    }, (err) => {
      console.log(err);
    });

  }

  getage($event) {
    this.dtDateISO = moment(this.birthdate);
    var timeDiff = Math.abs(Date.now() - this.dtDateISO);  //Getting Error
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)+ " Years";
  }

  genderinfo(value) {
    console.log(value);
    this.gender = value;
  }

  saveData() {
    if (this.termvalue) {
      if (this.name && this.birthdate && this.age && this.qualification && this.imgSrc && this.gender) {
        this.sqlite.create({
          name: 'studentdata.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO studentdetail VALUES(NULL,?,?,?,?,?,?)', [this.name, this.birthdate, this.age, this.imgSrc, this.qualification, this.gender])

            .then(res => {
              console.log(res);
              this.presentToast('Data saved');
              this.navCtrl.push("ListPage");
            })
            .catch(e => {
              console.log(e);
              this.presentToast(e);
            });
        }).catch(e => {
          console.log(e);
          this.presentToast(e);
        });
      }
      else {
        this.presentToast('Please fill all the the field');
      }
    } else {
      this.presentToast('Please accept the term and condition');
    }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
