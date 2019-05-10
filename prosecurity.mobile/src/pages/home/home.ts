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

  public activeMenu: string;
  public dateFilter: string;
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
    this.filter.endDate = null;
    this.filter.startDate = null;
    this.filter.limit = 15;
    this.filter.offset = 0;

    // this.content.ionScrollEnd.subscribe((data)=>{
    //   // My ideia is to get the whole content dimensions
    //   let dimensions = this.content.getContentDimensions();
    //
    //   console.log("Dimensions");
    //   console.log(dimensions);
    //   console.log("Scroll ");
    //   console.log(data);
    //
    //   // And compare it with the scroll data.
    //   if(dimensions.contentTop == data.scrollTop){
    //     console.log("Looks like I'm in the bottom of the scroll element!");
    //   }
    //
    // });
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
    }
    this.dateFilter = '';
    if(this.filter.startDate) {
      this.dateFilter = new Date(this.filter.startDate).toJSON().substr(0, 10);
      if(!this.filter.endDate)
        this.filter.endDate = new Date();
    }
    if(this.filter.startDate && this.filter.endDate)
      this.dateFilter += ' - ';
    if(this.filter.endDate) {
      if(!this.filter.startDate)
        this.dateFilter += '... - ';
      this.dateFilter += new Date(this.filter.endDate).toJSON().substr(0, 10);
    }
    this.eventList = [];
    this.filter.offset = 0;
    this.callServiceGetEventList();
  }

  clearFilter(){
    this.filter.startDate = null;
    this.filter.endDate = null;
    this.getEventist(null);
  }


  callServiceGetEventList(){
    this.childService.loadEvents(this.filter);
    this.childService.loadEvents(this.filter).then(list =>{
      list.forEach(event=> {
        this.eventList.push(event)
      });
    });
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


  test(){
    // console.error('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
    // this.filter.offset++;
    // this.callServiceGetEventList();
  }
  scrollDownOnLoad(){
    console.error('AAAAAAAAAAAAAAAAASSSSSSDDD')
  }

}
