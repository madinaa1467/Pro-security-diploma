import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFireMessaging} from '@angular/fire/messaging';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) { }
}
