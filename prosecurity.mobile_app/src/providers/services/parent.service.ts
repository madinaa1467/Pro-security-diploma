import {Injectable} from '@angular/core';
import {Api, AppLoader, Auth} from "../index";
import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";
import {AccountInfo} from "../../model/auth/account-info";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ParentService {

  constructor(private http: Api, private appLoader: AppLoader, private auth: Auth) {
  }
  public filter: EventFilter = new EventFilter();

  loadParentInfo():Promise<ToSave> {
    return this.http.get("parent/getInfo")
      .toPromise()
      .then(resp => ToSave.create(resp)).catch(err=>console.error(err));
  }
}
