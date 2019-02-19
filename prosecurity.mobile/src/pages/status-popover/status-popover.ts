import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {DictSimple} from "../../model/dict/dict-simple";


@IonicPage()
@Component({
  selector: 'page-status-popover',
  templateUrl: 'status-popover.html',
})
export class StatusPopoverPage {

  items: DictSimple[];
  selected;
  header: string;

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const data = this.navParams.data;

    if (data) {
      this.header = data.header;
      this.selected = data.selected;
      this.items = data.items;
    }
  }

  onSelected(item) {
    this.viewCtrl.dismiss(item);
  }
}
