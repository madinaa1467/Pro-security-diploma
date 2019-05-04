import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {EditProfile} from "../edit-profile/edit-profile";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Options');
  }

  goEditProfile() {
    // Open it as a modal page
    let modal = this.modalCtrl.create(EditProfile);
    modal.present();
  }
}
