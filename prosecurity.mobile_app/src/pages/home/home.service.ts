import {Injectable} from '@angular/core';
import {Api} from "../../providers";
import {ChildEvents} from "../../model/ChildEvents";
import {TOKEN_KEY} from "../../providers/auth/auth.metadata";
import {EventFilter} from "../../model/EventFilter";
// import {HttpService} from "../http.service";
// import {PersonRecord} from "../../model/PersonRecord";

@Injectable()
export class HomeService {
  constructor(private http: Api) {}

  public loading: boolean = false;

  public list: ChildEvents[] = [];
  public filter: EventFilter = new EventFilter();


  loadEvents(): Promise<ChildEvents[]> {
    this.filter.limit = 5;
    this.filter.startDate = new Date("2006-01-26");
    this.filter.endDate = new Date();

    return this.http.get("child/listAllEvents",
      {parentId: 1, filter: JSON.stringify(this.filter)})
      .toPromise()
      .then(resp =>  {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:', resp);

        if(!resp) return resp;

        return (<any> resp).map((r) =>
        ChildEvents.create(r)
      );
      });
  }

  async load() {

    try {
      console.log('Looooooooooooooooooooooooooooad:');

      this.loading = true;
      this.list = await this.loadEvents();
      this.loading = false;

    } catch (e) {

      this.loading = false;
      console.error(e);

    }
  }
}
