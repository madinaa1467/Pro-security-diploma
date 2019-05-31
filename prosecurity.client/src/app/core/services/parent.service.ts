import {Injectable} from '@angular/core';
import {EventWeb} from "../model/EventWeb";
import {HttpService} from "../../http/services";
import {EventFilterWeb} from "../model/EventFilterWeb";
import {Child} from "../model/Child";


@Injectable()
export class ParentService {

  constructor(private http: HttpService) {
  }

  getEventList(filter : EventFilterWeb){

    console.log('Call /parent/web/getEventList filter:', filter);
    return this.http.get('/parent/web/getEventList',
      {filter: JSON.stringify(filter)})
      .toPromise().then(resp => {
      console.log("Response from /parent/web/getEventList:  ", resp);
      if (!resp)
        console.error(resp);
      return (<any> resp).map((r) =>
        EventWeb.create(r)
      );
    });
  }


  getChildList(){
    console.log('Call parent/web/getChildList');
    return this.http.get('/parent/web/getChildList')
      .toPromise().then(resp => {
      console.log("Response from parent/web/getChildList:  ", resp);
      if (!resp)
        console.error(resp);
      return (<any> resp).map((r) =>
        Child.create(r)
      );
    });
  }

}
