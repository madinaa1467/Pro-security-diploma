import {Injectable} from '@angular/core';
import {Api, AppLoader, Auth} from "../index";
import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";
import {AccountInfo} from "../../model/auth/account-info";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ParentService {

  private accountInfo: AccountInfo;

  constructor(private http: Api, private appLoader: AppLoader, private auth: Auth) {
  }

  public filter: EventFilter = new EventFilter();
  readonly parentInfoValueChanges$ = new Subject<ToSave>();

  loadParentInfo() {
    this.accountInfo = this.auth.accountInfo;
    console.log('Call parent/getInfo: parent - by AccountInfo id ', this.accountInfo.id);
    return this.http.get("parent/getInfo",
      {parentId: this.accountInfo.id})
      .toPromise()
      .then(resp => ToSave.create(resp));
    /*.then(resp => {
      console.log('Response from server parent/getInfo:', resp);
      return ToSave.create(resp);
      //this.parentInfoValueChanges$.next(ToSave.create(resp));
    });*/
  }
}
