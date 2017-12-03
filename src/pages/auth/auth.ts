import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth';

import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'auth.html',
  selector: 'auth-home',
})

export class AuthPage {
  error: any;

  constructor(private navCtrl: NavController, private auth: AuthProvider) {}

  ngOnInit() {

  }

  loginUserWithGoogle() {
    this.auth.loginWithGoogle().subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.error = err;
    });
  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.error = err;
    });
  }
}
