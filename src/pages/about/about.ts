import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  coffees: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  af: AngularFire) {
    this.coffees = af.database.list('/coffee');
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
