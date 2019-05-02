import {Injectable} from '@angular/core';
import {Api} from "../index";
import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";

@Injectable()
export class ParentService {

  constructor(private http: Api) {
  }
  public filter: EventFilter = new EventFilter();

  loadParentInfo():Promise<ToSave> {
    return this.http.get("parent/getInfo")
      .toPromise()
      .then(resp => ToSave.create(resp));
  }
}
