import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Auth, DropdownService} from "../../providers";
import {IncomingService} from "./incoming.service";
import {DictSimple} from "../../model/dict/dict-simple";
import {Request} from "../../model/incoming/request";
import {RequestFilter} from "../../model/incoming/request-filter";
import {RequestList} from "../../model/incoming/request-list";
import {ACTION_SHEET_PAGE} from "../index";

@IonicPage()
@Component({
  selector: 'page-incoming',
  templateUrl: 'incoming.html',

})
export class IncomingPage {

  private _status: DictSimple[];
  selectedStatus: DictSimple;

  private infinite: InfiniteScroll;
  items: Request[] = [];

  readonly filter: RequestFilter = new RequestFilter();
  totalPage: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: Auth,
              private incomingService: IncomingService,
              private dropdownService: DropdownService) {
  }

  ionViewCanEnter() {
    return this.auth.isAuthenticated();
  }

  ionViewDidLoad() {
    this.loadStatusDictSimple();
    this.loadRequestList();
    console.log('ionViewDidLoad IncomingPage');
  }

  private loadStatusDictSimple() {
    this.incomingService.loadStatusDictSimple().then(res => {
      this._status = res;
      this.selectedStatus = res.find(x => x.id === this.filter.statusId);
    });
  }

  loadRequestList(refresher?: Refresher) {

    this.filter.spg = 1;
    this.incomingService.loadRequestList(this.filter)
      .then((res: RequestList) => {

        this.filter.spg = res.currentPage;
        this.totalPage = res.pagesCount;
        this.items = res.requests;

        if (refresher) refresher.complete();
        if (this.infinite) this.infinite.enable(true);
    });
  }

  loadMoreRequestList(infiniteScroll: InfiniteScroll) {
    this.infinite = infiniteScroll;

    if (this.filter.spg == this.totalPage) {

      this.infinite.complete();
      this.infinite.enable(false);
      return;
    }

    this.filter.spg++;
    this.incomingService.loadRequestList(this.filter)
      .then((res: RequestList) => {
        this.filter.spg = res.currentPage;
        this.totalPage = res.pagesCount;
        this.items = this.items.concat(res.requests);

        this.infinite.complete();
      });
  }

  dropdown(event) {
    this.dropdownService.create({
      data: {
        header: 'Статус',
        selected: this.filter.statusId,
        items: this._status
      },
      navOptions: {ev: event}
    }).then((res: DictSimple) => {
      this.selectedStatus = res;
      this.filter.statusId = res.id;
      this.loadRequestList();
    });
  }

  edit(uid: string) {
    this.navCtrl.push(ACTION_SHEET_PAGE, {uid});
  }
}
