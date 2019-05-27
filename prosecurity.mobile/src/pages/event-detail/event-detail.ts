import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Event} from "../../model/Event";

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetail implements OnInit{
  @ViewChild(Content) content: Content;

  public event: Event = new Event();

  ngOnInit(): void {
    this.event = this.navParams.get('event');
    console.error('Moooodal: ', this.event);
  }

  constructor(public navParams: NavParams) {
  }
}
