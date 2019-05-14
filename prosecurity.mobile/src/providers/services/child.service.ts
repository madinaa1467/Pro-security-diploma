import {Injectable} from '@angular/core';
import {Api} from "../index";
import {EventList} from "../../model/EventList";
import {EventFilter} from "../../model/EventFilter";
import {Child} from "../../model/Child";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Event} from "../../model/Event";
import {ChildToSave} from "../../model/ChildToSave";

@Injectable()
export class ChildService {
  constructor(private http: Api) {
  }

  public loading: boolean = false;
  readonly parentChildListValueChanges$ = new BehaviorSubject([]);
  readonly allChildrenEventListValueChanges$ = new BehaviorSubject([]);
  readonly lastEventMessagesChanges$ = new BehaviorSubject([]);

  getLastEventsList() {
    console.log('Call child/getLastEventsList:');
    this.http.get("child/getLastEventsList")
      .toPromise()
      .then(resp => {
        console.log("Response from child/getLastEventsList:  ", resp);
        this.lastEventMessagesChanges$.next((<any> resp).map((r) => Event.create(r)));
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

  load(filter: EventFilter) {
    this.loadParentChildren();
    this.loadEvents(filter);
    this.getLastEventsList()
  }

  loadEvents(filter: EventFilter) {

    console.log('Call child/listAllEvents: filter - ', filter);
    this.http.get("child/listAllEvents",
      {filter: JSON.stringify(filter)})
      .toPromise()
      .then(resp => {
        console.log('Response from server child/listAllEvents:', resp);
        if (!resp) {
          return [];
        }
        if (filter.offset == 0) {
          this.allChildrenEventListValueChanges$.next((resp as EventList[]).map((r) => EventList.create(r)));
        } else {
          let list = this.allChildrenEventListValueChanges$.value;
          list = list.concat((resp as EventList[]).map((r) => EventList.create(r)));
          this.allChildrenEventListValueChanges$.next(list);
        }
      });
  }


  loadMessageEvents(filter: EventFilter) {

    console.log('Call child/listAllEvents: parent - 1(static)', 'filter - ', filter);
    return this.http.get("child/listAllEvents",
      { filter: JSON.stringify(filter)})
      .toPromise()
      .then(resp => {
        console.log('Response from server child/listAllEvents:', resp);
        if (!resp) {
          return [];
        }
        return (resp as EventList[]).map((r) => EventList.create(r));
      });
  }

  getChildByCard(card_number: string, childId: number) {
    console.log('Call child/getChildByCard: ', card_number);
    return this.http.get("child/getChildByCard",
      {cardNumber: card_number, childId: childId })
      .toPromise()
      .then(resp => {
        console.log('Response from server child/getChildByCard:', resp);
        return Child.create(resp);
      });
  }

  save(childToSave) {
    return this.http.post("child/save",
      {"childToSave": JSON.stringify(ChildToSave.create(childToSave))})
      .toPromise().then(resp => {
        console.log("Response from child/save:  ", resp);
        if (!resp)
          console.error(resp);
        this.load(new EventFilter());
        return resp;
      });
  }

  delete(childId: number, how: string) {
    return this.http.post("child/delete",
      {childId: childId, delete: how})
      .toPromise().then(resp => {
        console.log("Response from child/delete:  ", resp);
        if (!resp)
          console.error(resp);
        this.load(new EventFilter());
        return resp;
      });
  }

}
