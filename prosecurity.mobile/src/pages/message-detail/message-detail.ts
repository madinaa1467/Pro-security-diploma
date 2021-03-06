import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChildService} from "../../providers/services/child.service";
import {EventFilter} from "../../model/EventFilter";

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetail {
  @ViewChild(Content) content: Content;

  public childFio:string;
  public childId:number;
  public loadMore: boolean = true;
  public childImg:string;
  public filter: EventFilter = new EventFilter();

  public messages = [];
  @ViewChild('messagesContent') elementView: ElementRef;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private childService: ChildService, public renderer: Renderer2) {
    this.childFio = this.navParams.get('childFio');
    this.childId = this.navParams.get('childId');
    this.childImg = this.navParams.get('childImg');
    this.filter.childId = this.childId;
    this.filter.limit = 15;
    this.filter.offset = 0;
    this.getMessages();
  }

  getMessages(){
    this.childService.loadMessageEvents(this.filter).then(resp =>{
      if(resp.length == 0 || this.messages.length > 30){
        this.loadMore = false;
      } else {
        this.loadMore = true;
        if (this.filter.offset == 0) {
          this.messages = resp.reverse();
          setTimeout(() => {

            if(this.elementView &&
              (this.elementView.nativeElement.scrollHeight > this.elementView.nativeElement.offsetHeight)){
              this.renderer.setStyle(this.elementView.nativeElement, 'height', 100 + '%');
            } else{
              this.renderer.setStyle(this.elementView.nativeElement, 'height', 60 + '%');
            }
            this.content.scrollToBottom();
          }, 200);
        } else {
          this.messages = resp.reverse().concat(this.messages);
        }
      }
    });
  }

  loadDataMoreMessages(event){
    setTimeout(() => {
      event.complete();

      this.filter.offset++;
      this.getMessages();
    }, 500);
  }
}
