import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;
  rootPage = TabsPage;

  constructor(private platform: Platform, protected data: DataProvider,
              protected auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.user = {
      image: ''
    };
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(TabsPage);
          this.isAppInitialized = true;
        }
        this.user = data;
//        this.data.list('pets').subscribe(data => {
//          console.log(data);
//        });
      }, err => {
        this.nav.setRoot(AuthPage);
      });
      StatusBar.styleDefault();
    });
  }
}
