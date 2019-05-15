import {Component, OnDestroy, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import { MessageDetail } from '../message-detail/message-detail';
import { NewMessage } from '../new-message/new-message';
import {ChildService} from "../../providers/services/child.service";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class Messages implements OnInit, OnDestroy {

  public messageList;
  private lastMessageChanges$: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public childService: ChildService) {
  }

  ngOnInit(): void {

    this.lastMessageChanges$ = this.childService.lastEventMessagesChanges$.subscribe(list => {
      this.messageList = list;
    });
    this.childService.getLastEventsList();
  }

  ngOnDestroy(): void {
    this.lastMessageChanges$.unsubscribe();
  }

  // goNewMessage() {
  //   this.app.getRootNav().push(NewMessage);
  // }

  goMessageDetail(childId: number, childFio:string, childImg:string) {
    this.navCtrl.push('MessageDetail', { childId:childId, childFio: childFio, childImg: childImg});
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.childService.getLastEventsList();
    }, 500);
  }

}
