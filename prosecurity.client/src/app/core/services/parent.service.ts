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

  getChildByCard(card_number: string, password: string, childId: number) {
    console.log('Call child/getChildByCard: ', card_number, "password", password);
    return this.http.get("/child/getChildByCard",
      {cardNumber: card_number, password: password, childId: childId })
      .toPromise()
      .then(resp => {
        console.error('Response from server child/getChildByCard:', resp);
        return Child.create(resp);
      });
  }

  save(childToSave) {
    console.log('Call child/save: ', childToSave);
    return this.http.post("/child/save",
      {"childToSave": JSON.stringify(childToSave)})
      .toPromise().then(resp => {
        console.log("Response from child/save:  ", resp);
        if (!resp)
          console.error(resp);
        return resp;
      });
  }

}
