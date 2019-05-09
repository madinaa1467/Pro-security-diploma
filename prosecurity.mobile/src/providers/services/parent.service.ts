import {Injectable} from '@angular/core';
import {Api, Auth} from "../index";

import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";
import {ParentDetails} from "../../model/parent-details";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ParentService {

  constructor (private http: Api, private auth: Auth, private httpClient: HttpClient) {
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

  loadFile (fileId: string) {
    return this.http.get('files/get', {fileId: fileId}, {observe: 'response', responseType: 'blob'})
      .toPromise().then(res => {
        //  const url = window.URL.createObjectURL(res);
        //console.log("url:", res.url)
        console.log('res:', res)
        return res;
      }).catch(err => console.log('err', err));
  }
}
