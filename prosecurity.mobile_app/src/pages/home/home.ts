import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {App, Content, NavController, PopoverController} from 'ionic-angular';
import {PostPopover} from './post-popover';
import {Messages} from '../messages/messages';
import {ChildService} from "../../providers/services/child.service";
import {Subscription} from "rxjs/Subscription";

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
  public loading: boolean = false;
  public tap: number = 0;

  // You can get this data from your API. This is a dumb data for being an example.
  public stories = [
    {
      id: 1,
      img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      user_name: 'candelibas',
      path: ''
    },
    {
      id: 2,
      img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      user_name: 'maxlynch',
      path: ''
    },
    {
      id: 3,
      img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      user_name: 'ashleyosama',
      path: ''
    },
    {
      id: 4,
      img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      user_name: 'adam_bradley',
      path: ''
    },
    {
      id: 5,
      img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      user_name: 'linus_torvalds',
      path: ''
    }

  ];
  private storiesChanges$: Subscription;


  // public stories;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public app: App,
              public childService: ChildService) {

  }

  ngOnInit() {
    this.storiesChanges$ = this.childService.parentChildListValueChanges$.subscribe(list => {
      this.stories = list
    });

    this.init();
  }

  ngOnDestroy() {
    this.storiesChanges$.unsubscribe();
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

  goMessages() {
    this.app.getRootNav().push(Messages);
  }

  swipePage(event) {
    if(event.direction === 1) { // Swipe Left
      console.log("Swap Camera");
    }

    if(event.direction === 2) { // Swipe Right
      this.goMessages();
    }

  }

  scrollToTop() {
    this.content.scrollToTop();
  }


  // loadStories() {
  //   console.log('My children: ', this.childService.parentChildList);
  //   // this.childService.parentChildList.forEach(function (value) {
  //   //   console.log('child: ', value);
  //   //   this.stories.push(value)
  //   // });
  //   for (let child of this.childService.parentChildList) {
  //     console.log('child: ', child);
  //     this.stories.push(child);
  //     // this.stories.get(child).image = 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120';
  //     // this.stories.get(child).user_name = 'AAAAD';
  //   }
  // }

  init() {
    this.childService.load();
  }

}
