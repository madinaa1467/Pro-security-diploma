import {Injectable} from '@angular/core';
import {EventWeb} from "../model/EventWeb";
import {HttpService} from "../../http/services";
import {EventFilterWeb} from "../model/EventFilterWeb";


@Injectable()
export class ModeratorService {

  constructor(private http: HttpService) {
  }

  getEventList(filter : EventFilterWeb){

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

  getLastEvent(){
    console.log('Call web/lastEvent');
    return this.http.get('/web/lastEvent')
      .toPromise().then(resp => {
      console.log("Response from web/lastEvent:  ", resp);
      if (!resp)
        console.error(resp);
      return EventWeb.create(resp);
    });
  }


  getRecentEvents(filter : EventFilterWeb) {
    console.log('Call web/recentEvents filter:', filter);
    return this.http.get('/web/recentEvents',
      {filter: JSON.stringify(filter)})
      .toPromise().then(resp => {
        console.log("Response from web/recentEvents:  ", resp);
        if (!resp)
          console.error(resp);
        return (<any> resp).map((r) =>
          EventWeb.create(r)
        );
      });
  }

}
