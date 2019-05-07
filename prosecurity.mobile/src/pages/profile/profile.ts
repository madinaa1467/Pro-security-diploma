import {Component, OnDestroy, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPost } from '../modal-post/modal-post';
import { EditProfile } from '../edit-profile/edit-profile';
import { Options } from '../options/options';
import { TaggedProfile } from '../tagged-profile/tagged-profile';
import { SavedProfile } from '../saved-profile/saved-profile';
import {ChildPofile} from "../child-pofile/child-pofile";
import {Subscription} from "rxjs/Subscription";
import {ChildService} from "../../providers/services/child.service";
import {Child} from "../../model/Child";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit, OnDestroy  {

  public profile_segment:string;
  //public childList$: Subscription;


  // You can get this data from your API. This is a dumb data for being an example.
  public images = [
    {
      id: 1,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    },
    {
      id: 2,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public childService: ChildService) {
  }
  ngOnInit(): void {
    // this.childList$ = this.childService.parentChildListValueChanges$.subscribe();
  }
  ngOnDestroy(): void {
    //this.childList$.unsubscribe();
  }

  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'grid';
  }

  goEditProfile() {
    // Open it as a modal page
    let modal = this.modalCtrl.create('EditProfile');
    modal.present();
  }

  goOptions() {
    this.navCtrl.push(Options, {});
  }

  goTaggedProfile() {
    this.navCtrl.push(TaggedProfile);
  }

  goSavedProfile() {
    this.navCtrl.push(SavedProfile);
  }

  // Triggers when user pressed a post
  childSaveEdit(child: Child) {
    console.error("AAAAAAAAAAAAAAAAAAAAAAAAAAAAsDDDDDDDDDDDDD", child);
    let modal;
    if(child) {
      modal = this.modalCtrl.create('ChildPofile', {child: child, action: 'edit'});
    } else{
      modal = this.modalCtrl.create('ChildPofile', {child: child, action: 'save'});
    }
    modal.present();
  }

  // Set post modal
  presentModal(user_id: number, username: string, profile_img: string, post_img: string) {

    //this.presentModal(user_id, username, profile_img, post_img);

    let modal = this.modalCtrl.create(ModalPost,
    { // Send data to modal
      user_id: user_id,
      username: username,
      profile_img: profile_img,
      post_img: post_img
    }, // This data comes from API!
    { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

}
