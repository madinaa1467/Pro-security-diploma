import {Injectable} from '@angular/core';
import {Api, Auth} from "../index";
import {EventFilter} from "../../model/EventFilter";
import {ToSave} from "../../model/ToSave";
import {ParentDetails} from "../../model/parent-details";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ParentService {

  constructor(private http: Api, private auth: Auth, private httpClient: HttpClient) {
  }

  public filter: EventFilter = new EventFilter();

  loadParentInfo(): Promise<ParentDetails> {
    console.log('Call parent/getInfo:');
    return this.http.get("parent/getInfo")
      .toPromise()
      .then(resp => {
        console.log("Response from parent/getInfo:  ", resp);
        return ParentDetails.create(resp)
      });
  }

  save(toSave) {
    console.log('Call parent/save toSave', JSON.stringify(ToSave.create(toSave)));
    return this.http.post("parent/save", {"toSave": JSON.stringify(ToSave.create(toSave))})
      .toPromise().then(res => {
        console.log("Response from parent/save:  ", res);
        this.auth.setAccountInfo(res);
    });
  }

  checkPassword(oldPassword) {
    console.log('Call parent/checkPassword');
    return this.http.post("parent/checkPassword", {"oldPassword": oldPassword})
      .toPromise().then(res => {
        console.log("Response from parent/checkPassword:  ", res);
        this.auth.setAccountInfo(res);
    });
  }
}
