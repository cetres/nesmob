import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

// Providers
import { DataProvider } from './data';

@Injectable()
export class MachineProvider {
  machine: any;
  constructor(private af: AngularFire, private data: DataProvider, private platform: Platform) {}

}