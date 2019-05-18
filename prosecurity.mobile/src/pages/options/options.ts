import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {EditProfile} from "../edit-profile/edit-profile";
import {EditPrivateInfo} from "../edit-private-info/edit-private-info";
import {Auth} from "../../providers";

/**
 * Generated class for the Options page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class Options {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private auth: Auth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Options');
  }

  goEditProfile() {
    // Open it as a modal page
    let modal = this.modalCtrl.create('EditProfile');
    modal.present();
  }

  goEditPrivateInfo() {
    console.error("EEedit-private-info")
    let modal = this.modalCtrl.create('EditPrivateInfo');
    modal.present();
  }

  logOut(){
    this.auth.logout();
  }
}
