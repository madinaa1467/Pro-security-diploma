import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {App, Content, IonicPage, MenuController, NavController, PopoverController} from 'ionic-angular';
import {ChildService} from "../../providers/services/child.service";
import {Subscription} from "rxjs/Subscription";
import {EventFilter} from "../../model/EventFilter";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home implements OnInit, OnDestroy {
  @ViewChild(Content) content: Content;

  public activeMenu: string;
  public dateFilter: string;
  // You can get this data from your API. This is a dumb data for being an example.
  public stories = [];
  public eventList = [];
  private storiesChanges$: Subscription;
  public allChildrenEventListChanges$: Subscription;
  public filter: EventFilter = new EventFilter();
  public loadMore: boolean = true;

  // public stories;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public app: App,
              public childService: ChildService, public menu: MenuController) {
    this.menuActive();
    this.filter.childId = 0;
    this.filter.endDate = null;
    this.filter.startDate = null;
    this.filter.limit = 15;
    this.filter.offset = 0;
  }

  menuActive() {
    this.activeMenu = 'menu';
    this.menu.enable(true, 'menu');
  }

  ngOnInit() {
    this.storiesChanges$ = this.childService.parentChildListValueChanges$.subscribe(list => {
      this.stories = list
    });
    this.eventList = [];
    this.allChildrenEventListChanges$ = this.childService.allChildrenEventListValueChanges$.subscribe(list => {
      if ((list.length == this.eventList.length && this.filter.offset != 0) || this.eventList.length > 30) {
        this.loadMore = false;
      } else {
        this.loadMore = true;
        this.eventList = (list);
      }
    });
    this.init();
  }

  test(day) {
    console.log("day:", day);
  }

  ngOnDestroy() {
    this.storiesChanges$.unsubscribe();
    this.allChildrenEventListChanges$.unsubscribe();
  }

  init() {
    this.childService.load(this.filter);
  }

  getEventist(childId: number) {
    if (childId != null) {
      this.filter.childId = childId;
    }
    this.dateFilter = '';
    if (this.filter.startDate) {
      this.dateFilter = new Date(this.filter.startDate).toJSON().substr(0, 10);
      if (!this.filter.endDate)
        this.filter.endDate = new Date();
    }
    if (this.filter.startDate && this.filter.endDate)
      this.dateFilter += ' - ';
    if (this.filter.endDate) {
      if (!this.filter.startDate)
        this.dateFilter += '... - ';
      this.dateFilter += new Date(this.filter.endDate).toJSON().substr(0, 10);
    }
    this.eventList = [];
    this.filter.offset = 0;
    this.callServiceGetEventList();
  }

  clearFilter() {
    this.filter.startDate = null;
    this.filter.endDate = null;
    this.getEventist(null);
  }


  callServiceGetEventList() {
    this.childService.loadEvents(this.filter);
  }

  //todo fix swipes
  swipePage(event) {
    if (event.direction === 1) { // Swipe Left
      console.error("Swap Left");
    }

    if (event.direction === 2) { // Swipe Right
      console.error("Swap Right");

      // this.goMessages();
    }

  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }


  loadData(event) {
    setTimeout(() => {
      event.complete();

      if(this.loadMore == true) {
        this.filter.offset++;
        this.callServiceGetEventList();
      }
    }, 500);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.filter.offset = 0;
      this.childService.load(this.filter);
    }, 500);
  }

}
