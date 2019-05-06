import {Injectable} from '@angular/core';
import {Api, Auth} from "../index";
import {EventList} from "../../model/EventList";
import {EventFilter} from "../../model/EventFilter";
import {Storage} from "@ionic/storage";
import {Child} from "../../model/Child";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AccountInfo} from "../../model/auth/account-info";
import {Event} from "../../model/Event";

@Injectable()
export class ChildService {
  constructor(private http: Api) {
  }

  public loading: boolean = false;
  readonly parentChildListValueChanges$ = new BehaviorSubject([]);
  readonly allChildrenEventListValueChanges$ = new BehaviorSubject([]);

  getLastEventsList(){
    console.log('Call child/getLastEventsList: parent - by AccountInfo id ');
    return this.http.get("child/getLastEventsList")
      .toPromise()
      .then(resp => {
        return (<any> resp).map((r) =>
          Event.create(r));
  });
  }

  getParentChildren(): Promise<Child[]> {
    console.log('Call child/getChildList');
    return this.http.get('child/getChildList')
      .toPromise().then(resp => {
        console.log("Response from child/getChildList:  ", resp);
        if (!resp)
          console.error(resp)
        return (<any> resp).map((r) =>
          Child.create(r)
        );
      });
  }

  loadParentChildren() {
    this.loading = true;
        return this.getParentChildren()
          .then(result => this.parentChildListValueChanges$.next(result))
          .catch(error => {
            console.error("Произошла ошибка при загрузки данный сессии");
            return [];
          });
  }

  load(filter : EventFilter) {
    this.loadParentChildren();
    this.loadEvents(filter);
  }

  loadEvents(filter: EventFilter) {

    filter.limit = 15;
    if(!filter.endDate)
      filter.endDate = new Date();

    console.log('Call child/listAllEvents: parent - 1(static)', 'filter - ', filter);
    return this.http.get("child/listAllEvents",
      { filter: JSON.stringify(filter)})
      .toPromise()
      .then(resp => {
        console.log('Response from server child/listAllEvents:', resp);
        if (!resp) {
          return [];
        }
        this.allChildrenEventListValueChanges$.next((resp as EventList[]).map((r) => EventList.create(r)));
        return (resp as EventList[]).map((r) => EventList.create(r));
      });
  }

}
