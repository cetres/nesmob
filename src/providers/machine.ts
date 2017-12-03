import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

// Providers
import { DataProvider } from './data';

@Injectable()
export class MachineProvider {
  machine: any;
  constructor(private af: AngularFireDatabase, private data: DataProvider, private platform: Platform) {}

}