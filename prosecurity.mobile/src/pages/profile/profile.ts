import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {Options} from '../options/options';
import {ChildPofile} from "../child-pofile/child-pofile";
import {ChildService} from "../../providers/services/child.service";
import {Child} from "../../model/Child";
import {AccountInfo} from "../../model/auth/account-info";
import {Auth} from "../../providers";
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile implements OnInit, OnDestroy  {

  public accountInfo$: Subscription;
  public accountInfo: AccountInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public childService: ChildService, private auth: Auth) {
  }
  ngOnInit(): void {
    this.accountInfo$ = this.auth.accountInfoChanges$.subscribe(list => {
      this.accountInfo = list;
    });
    console.error('accountInfo', this.accountInfo)
  }
  ngOnDestroy(): void {
    this.accountInfo$.unsubscribe();
  }

  goOptions() {
    this.navCtrl.push(Options, {});
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


}
