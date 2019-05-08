import {Injectable} from '@angular/core';
import {Api, Auth} from "../index";

import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";
import {ParentDetails} from "../../model/parent-details";

@Injectable()
export class ParentService {

  constructor(private http: Api, private auth:Auth) {
  }
  public filter: EventFilter = new EventFilter();

  loadParentInfo():Promise<ParentDetails> {
    return this.http.get("parent/getInfo")
      .toPromise()
      .then(resp => ParentDetails.create(resp));
  }

  save(toSave) {
    return this.http.post("parent/save", {"toSave": JSON.stringify(ToSave.create(toSave))})
      .toPromise().then(res => {
        this.auth.setAccountInfo(res);
        console.log("11111");
    });
  }
}
