import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Event} from "../../model/Event";

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetail {
  @ViewChild(Content) content: Content;

  public event: Event;

  constructor(public navParams: NavParams) {
    this.event = this.navParams.get('event');
    console.error('Moooodal: ', this.event);
  }
}
