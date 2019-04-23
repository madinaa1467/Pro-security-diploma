import {Injectable} from '@angular/core';
import {Api, AppLoader, Auth} from "../index";
import {EventList} from "../../model/EventList";
import {EventFilter} from "../../model/EventFilter";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ToSave} from "../../model/ToSave";
import {AccountInfo} from "../../model/auth/account-info";

@Injectable()
export class ParentService {

  private accountInfo: AccountInfo;
  constructor(private http: Api, private appLoader: AppLoader, private auth: Auth) {
  }

  public filter: EventFilter = new EventFilter();
  readonly parentInfoValueChanges$ = new BehaviorSubject([]);
  readonly allChildrenEventListValueChanges$ = new BehaviorSubject([]);

  loadParentInfo() {
    this.accountInfo = this.auth.accountInfo;
    console.log('Call parent/getInfo: parent - by AccountInfo id ', this.accountInfo.id);
    this.http.get("parent/getInfo",
      {parentId: this.accountInfo.id})
      .toPromise()
      .then(resp => {
        console.log('Response from server parent/getInfo:', resp);
        // this.allChildrenEventListValueChanges$.next(ToSave.create(resp));
      });
  }

  load(){
    this.loadParentInfo();
  }

}
