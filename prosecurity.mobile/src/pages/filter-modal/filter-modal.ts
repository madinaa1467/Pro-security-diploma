import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  public femaleSelected = true;
  public maleSelected = true;

  constructor(private viewController:ViewController,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  closeModal() {
    let filterState= {
      femaleSelected :this.femaleSelected,
      maleSelected:this.maleSelected
    }
    this.viewController.dismiss(filterState);
  }
}
