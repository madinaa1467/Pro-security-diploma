import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FilterModalPage} from "../filter-modal/filter-modal";

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  constructor(private modalController: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  openFilterModal() {
    let openFilterModal = this.modalController.create('FilterModalPage');
    openFilterModal.onDidDismiss((filterState)=>{
      console.log("filterState",filterState)
    });
    openFilterModal.present();
  }
}
