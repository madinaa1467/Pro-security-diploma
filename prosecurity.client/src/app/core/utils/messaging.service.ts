import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import {AngularFireMessaging} from '@angular/fire/messaging';
import {AngularFireFunctions} from '@angular/fire/functions';
import {map, switchMap, tap} from "rxjs/internal/operators";
import {HttpService} from "../../http/services";
import {filter, share} from "rxjs/operators";
// import * as app from 'firebase';

export const FCM_REGISTRATION_ID = 'fcm_registration_id';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);

  constructor(private http: HttpService,
              private angularFireMessaging: AngularFireMessaging,
              private fun: AngularFireFunctions) {
    // app.messaging.
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );

    this.receiveMessage().subscribe();
  }

  requestPermission() {
    return this.angularFireMessaging.requestToken.pipe(
      switchMap(registrationId => {
        return this.http.post("/notification/register", {registrationId: registrationId}).pipe(
          tap((res) => {
            console.log('registrationId:', registrationId);
            localStorage.setItem(FCM_REGISTRATION_ID, registrationId as string);
          })
        )
      })
    );//.subscribe(registrationId => console.log('registrationId:', registrationId));
  }

  unregister() {
    let registrationId = localStorage.getItem(FCM_REGISTRATION_ID);
    if (!registrationId) return of({});

    return this.angularFireMessaging.deleteToken(registrationId).pipe(
      switchMap(res => {
        console.log('res:', res);
        return this.http.get("/notification/unregister", {registrationId: registrationId}).pipe(
          map(() => {
            localStorage.removeItem(FCM_REGISTRATION_ID);
            return res;
          })
        )
      })
    )
  }

  private receiveMessage() {
    return this.angularFireMessaging.messages.pipe(tap(message => {
      console.log("new message received. ", message);
      this.currentMessage.next(message);
    }));
  }

  onMessage() {
    return this.currentMessage.pipe(
      filter(message => !!message),
      share(),
    );
  }

  subscribe(topic) {
    let registrationId = localStorage.getItem(FCM_REGISTRATION_ID,);

    this.http.post("/notification/subscribe", {registrationId: registrationId, topic: topic})
      .pipe(tap(_ => console.log(`subscribed to ${topic}`)))
      .subscribe();
  }

  unsubscribe(topic) {
    let registrationId = localStorage.getItem(FCM_REGISTRATION_ID,);

    this.http.get("/notification/unsubscribe", {registrationId: registrationId, topic: topic})
      .pipe(tap(_ => console.log(`unsubscribed from ${topic}`)))
      .subscribe();
  }

}
