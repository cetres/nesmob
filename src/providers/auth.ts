import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Facebook, GooglePlus } from 'ionic-native';
import * as firebase from 'firebase/app';

// Providers
import { DataProvider } from './data';

@Injectable()
export class AuthProvider {
  user: any;
  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private data: DataProvider, private platform: Platform) {}

  getUserData() {
    return Observable.create(observer => {
      this.afa.authState.subscribe(authData => {
        if (authData) {
          this.data.object('users/' + authData.uid).valueChanges().subscribe(userData => {
            console.log(userData);
            this.user = userData;
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  loginWithGoogle() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        GooglePlus.login({
             'webClientId' : GOOGLE_WEBCLIENT_ID }).then(googleData => {
                console.log("gplusData:"+JSON.stringify(googleData));
          let provider = firebase.auth.GoogleAuthProvider.credential(googleData.idToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.afd.list('users').update(firebaseData.uid, {
              name: firebaseData.displayName,
              email: firebaseData.email,
              provider: 'googleplus',
              image: firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()
          ).then((googleData) => {
          this.afd.list('users').update(googleData.auth.uid, {
            name: googleData.auth.displayName,
            email: googleData.auth.email,
            provider: 'googleplus',
            image: googleData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.afd.list('users').update(firebaseData.uid, {
              name: firebaseData.displayName,
              email: firebaseData.email,
              provider: 'facebook',
              image: firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()
          ).then((facebookData) => {
          this.afd.list('users').update(facebookData.auth.uid, {
            name: facebookData.auth.displayName,
            email: facebookData.auth.email,
            provider: 'facebook',
            image: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  logout() {
    this.afa.auth.signOut();
  }
}
