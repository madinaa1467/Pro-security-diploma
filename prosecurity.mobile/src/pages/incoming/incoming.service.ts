import {Injectable} from "@angular/core";
import {Api} from "../../providers";
import {DictSimple} from "../../model/dict/dict-simple";
import {RequestList} from "../../model/incoming/request-list";
import {RequestFilter} from "../../model/incoming/request-filter";


@Injectable()
export class IncomingService {

  constructor(private api: Api) {
    console.log("IncomingService created");
  }

  loadStatusDictSimple() {
    return this.api.get('dict/status')
      .toPromise()
      .then(res => (<any> res).map((value) => DictSimple.create(value)));
  }

  loadRequestList(filter: RequestFilter) {
    return this.api.post("getGroupInboxList", filter)
      .toPromise().then(res => RequestList.create(res));
  }
}
