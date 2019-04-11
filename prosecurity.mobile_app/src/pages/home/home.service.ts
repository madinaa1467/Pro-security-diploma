import {Injectable} from '@angular/core';
import {Api} from "../../providers";
// import {HttpService} from "../http.service";
// import {PersonRecord} from "../../model/PersonRecord";

// @Injectable({
//   providedIn: 'root'
// })
export class HomeService {
  constructor(private http: Api) {}

  public loading: boolean = false;

  public list: PersonRecord[] = [];

  loadEvents(): Promise<PersonRecord[]> {
    return this.http.get("/person/list")
      .toPromise()
      .then(resp => resp.body as Array<any>)
      .then(body => body.map(r => PersonRecord.create(r)));
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
