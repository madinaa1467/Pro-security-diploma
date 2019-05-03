import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChildService} from "../../providers/services/child.service";

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetail {

  public childFio:string;
  public childId:number;
  public childImg:string;
  public send_like_icon:boolean = false;
  public likeBtnVisible:boolean = false;

  public messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private childService: ChildService) {
    this.childFio = this.navParams.get('childFio');
    this.childId = this.navParams.get('childId');
    this.childImg = this.navParams.get('childImg');
    this.childService.loadEventsMessages(this.childId).then(resp =>{
      this.messages = resp;
    });
  }

  sendLike() {
    if(this.send_like_icon === false) {
      this.send_like_icon = true;
    }
      // Allow heart effect
      this.likeBtnVisible = !this.likeBtnVisible;
  }

}
