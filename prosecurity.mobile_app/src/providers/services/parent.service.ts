import {Injectable} from '@angular/core';
import {Api, AppLoader} from "../index";
import {EventList} from "../../model/EventList";
import {EventFilter} from "../../model/EventFilter";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ToSave} from "../../model/ToSave";

@Injectable()
export class ParentService {
  constructor(private http: Api, private appLoader: AppLoader) {
  }

  public filter: EventFilter = new EventFilter();
  readonly parentInfoValueChanges$ = new BehaviorSubject([]);
  readonly allChildrenEventListValueChanges$ = new BehaviorSubject([]);

  loadParentInfo() {
    console.log('Call parent/getInfo: parent - by AccountInfo id ', this.appLoader.accountInfo);
    this.http.get("parent/getInfo",
      {parentId: this.appLoader.accountInfo.id})
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
