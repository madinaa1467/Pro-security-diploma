import {Injectable} from '@angular/core';
import {EventWeb} from "../model/EventWeb";
import {HttpService} from "../../http/services";
import {EventFilterWeb} from "../model/EventFilterWeb";


@Injectable()
export class ModeratorService {

  constructor(private http: HttpService) {
  }

  getEventList(){

    let filter : EventFilterWeb = new EventFilterWeb();

    filter.limit = 15;
    filter.offset = 0;

    console.log('Call web/moderator');
    return this.http.get('/web/moderator',
      {filter: JSON.stringify(filter)})
      .toPromise().then(resp => {
      console.log("Response from web/moderator:  ", resp);
      if (!resp)
        console.error(resp);
      return (<any> resp).map((r) =>
        EventWeb.create(r)
      );
    });
  }

}
