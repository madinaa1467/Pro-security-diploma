import {Injectable} from '@angular/core';
import {Api} from "../index";
import {ChildEvents} from "../../model/ChildEvents";
import {EventFilter} from "../../model/EventFilter";

@Injectable()
export class ChildService {
  constructor(private http: Api) {}

  public loading: boolean = false;

  public list: ChildEvents[] = [];
  public filter: EventFilter = new EventFilter();


  loadEvents(): Promise<ChildEvents[]> {
    this.filter.limit = 5;
    this.filter.startDate = new Date("2006-01-26");
    this.filter.endDate = new Date();

    console.log('Call child/listAllEvents:');
    return this.http.get("child/listAllEvents",
      {parentId: 1, filter: JSON.stringify(this.filter)})
      .toPromise()
      .then(resp =>  {
        console.log('Response from server child/listAllEvents:', resp);
        if(!resp)
          return resp;
        return (<any> resp).map((r) =>
        ChildEvents.create(r)
      );
      });
  }

  async load() {

    try {
      this.loading = true;
      this.list = await this.loadEvents();
      this.loading = false;

    } catch (e) {
      this.loading = false;
      console.error(e);
    }
  }
}
