import {Injectable} from '@angular/core';
import {Api} from "..";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {map, switchMap} from "rxjs/operators";

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

  constructor (private api: Api, private push: Push) {
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

    console.log("unregister")

    /*if(!this.pushObject) return;
    this.pushObject.unregister();

    this.pushObject = null;*/
  }


  private onNotification (pushObject: PushObject) {
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
    });
  }

  private onRegistration (pushObject: PushObject) {
    pushObject.on('registration').pipe(
      switchMap(registration => {
        return this.api.post("/notification/register", registration).pipe(
          map(() => registration)
        );
      })
    ).subscribe((registration: any) => {
      console.log('Device registered', registration);
    });
  }

  private onError (pushObject: PushObject) {
    this.pushObject.on('error').subscribe(error => {
      console.log('Error with Push plugin', error);
    });
  }
}
