import {Injectable} from '@angular/core';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {map, switchMap} from "rxjs/operators";
import {Storage} from "@ionic/storage";
import {Api} from "../";
import {FCM_REGISTRATION_ID} from "../auth/auth.metadata";

@Injectable()
export class NotificationProvider {

  private pushObject: PushObject;

  private options: PushOptions = {
    android: {
      sound: true,
      vibrate: true,
    },
    ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
    }
  };

  constructor(private api: Api, private push: Push, private storage: Storage) {
  }

  register () {
    console.log("register");
    if (this.pushObject) return;

    this.pushObject = this.push.init(this.options);

    this.onNotification(this.pushObject);

    this.onRegistration(this.pushObject);

    this.onError(this.pushObject);

  }

  unregister () {
    return new Promise((resolve, reject) => {
      if (!this.pushObject) {
        resolve();
        return
      }

      this.pushObject.unregister().then(res => {
        console.log('storage.unregister:');
        return this.storage.get(FCM_REGISTRATION_ID).then(registrationId => {
          console.log('storage.registrationId:', registrationId);
          return this.api.get("notification/unregister", {registrationId: registrationId}).toPromise().then(res => {
            console.log('notification/unregister/registrationId:', registrationId);
            return this.storage.remove(FCM_REGISTRATION_ID).then(res => {
              console.log('pushObject null');
              this.pushObject = null;
              resolve();
            });
          });
        });
      }).catch(err => reject(err));
    })
  }


  private onNotification (pushObject: PushObject) {
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
    });
  }

  private onRegistration (pushObject: PushObject) {
    pushObject.on('registration').pipe(
      map(registration => registration),
      switchMap(registration => {
        return this.api.post("notification/register", registration).pipe(
          map(() => registration)
        );
      }))
      .subscribe((registration: any) => {
        this.storage.set(FCM_REGISTRATION_ID, registration.registrationId).then(() => {
          console.log('Device registered', registration);
        });
      });
  }

  private onError (pushObject: PushObject) {
    this.pushObject.on('error').subscribe(error => {
      console.log('Error with Push plugin', error);
    });
  }
}
