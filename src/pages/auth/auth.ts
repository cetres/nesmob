import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth';

import { HomePage } from '../home/home';

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
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
  }
}
