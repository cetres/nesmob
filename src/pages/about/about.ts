import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  coffees: AngularFireList<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  af: AngularFireDatabase) {
    this.coffees = af.list('/coffee');
  }

  getCoffee(){
    let prompt = this.alertCtrl.create({
      title: 'Coffee Name',
      message: "Enter a name for this coffee",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.coffees.push({
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
