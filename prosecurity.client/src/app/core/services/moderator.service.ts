import {Injectable} from '@angular/core';
import {EventWeb} from "../model/EventWeb";
import {HttpService} from "../../http/services";
import {EventFilterWeb} from "../model/EventFilterWeb";


@Injectable()
export class ModeratorService {

  constructor(private http: HttpService) {
  }

  getEventList(filter : EventFilterWeb){

    // let filter : EventFilterWeb = new EventFilterWeb();

    console.log('Call web/moderator filter:', filter);
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


  getEntranceList(){
    console.log('Call web/entrances');
    return this.http.get('/web/entrances')
      .toPromise().then(resp => {
      console.log("Response from web/entrances:  ", resp);
      if (!resp)
        console.error(resp);
      return (<any> resp).map((r) =>
        (r)
      );
    });
  }

}
