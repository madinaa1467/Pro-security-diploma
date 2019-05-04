import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {App, Content, MenuController, NavController, PopoverController} from 'ionic-angular';
import {PostPopover} from './post-popover';
import {Messages} from '../messages/messages';
import {ChildService} from "../../providers/services/child.service";
import {Subscription} from "rxjs/Subscription";
import {EventFilter} from "../../model/EventFilter";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home implements OnInit, OnDestroy {
  @ViewChild(Content) content: Content;

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };
  public tap: number = 0;
  public activeMenu: string;
  // You can get this data from your API. This is a dumb data for being an example.
  public stories = [];
  public eventList =[];
  private storiesChanges$: Subscription;
  private allChildrenEventListChanges$: Subscription;
  public filter: EventFilter = new EventFilter();
  // public stories;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public app: App,
              public childService: ChildService, public menu: MenuController) {
    this.menuActive();
    this.filter.childId = 0;
  }
  menuActive() {
    this.activeMenu = 'menu';
    this.menu.enable(true, 'menu');
  }

  ngOnInit() {
    this.storiesChanges$ = this.childService.parentChildListValueChanges$.subscribe(list => {
      this.stories = list
    });
    this.allChildrenEventListChanges$ = this.childService.allChildrenEventListValueChanges$.subscribe(list => {
      this.eventList = list
    });
    this.init();
  }

  ngOnDestroy() {
    this.storiesChanges$.unsubscribe();
  }

  init() {
    this.childService.load(this.filter);
  }
  getEventist(childId: number){
    if(childId != null) {
      this.filter.childId = childId;
      this.filter.startDate = null;
      this.filter.endDate = null;
    }
    this.childService.loadEvents(this.filter);
    this.childService.loadEvents(this.filter).then(list =>{
      this.eventList = list;
    });
  }

  likeButton() {
    if(this.like_btn.icon_name === 'heart-outline') {
      this.like_btn.icon_name = 'heart';
      this.like_btn.color = 'danger';
      // Do some API job in here for real!
    }
    else {
      this.like_btn.icon_name = 'heart-outline';
      this.like_btn.color = 'black';
    }
  }

  tapPhotoLike(times) { // If we click double times, it will trigger like the post
    this.tap++;
    if(this.tap % 2 === 0) {
      this.likeButton();
    }
  }

  presentPostPopover() {
    let popover = this.popoverCtrl.create(PostPopover);
    popover.present();
  }

  //todo fix swipes
  swipePage(event) {
    if(event.direction === 1) { // Swipe Left
      console.error("Swap Left");
    }

    if(event.direction === 2) { // Swipe Right
      console.error("Swap Right");

      // this.goMessages();
    }

  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
