import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  error: any;
  usuario: string;
  provider_icon: string;

  constructor(public navCtrl: NavController,
              private auth: AuthProvider,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController) {
    auth.getUserData();
    this.usuario = auth.user.name;
    this.provider_icon = "logo-" + auth.user.provider;
  }

  logout() {
    let actionSheet = this.actionSheetCtrl.create({
    title: 'Deseja realizar logoff?',
    buttons: [
      {
        text: 'Logoff',
        role: 'destructive',
        handler: () => {
          this.auth.logout();
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Click em Cancel');
        }
      }
    ]
  });
  actionSheet.present();
  }

}
