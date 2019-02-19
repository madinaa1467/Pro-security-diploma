import {Injectable} from '@angular/core';
import {HttpService} from "../http.service";
import {PersonRecord} from "../../model/PersonRecord";

@Injectable({
  providedIn: 'root'
})
export class ClientListService {
  constructor(private http: HttpService) {}

  public loading: boolean = false;

  public list: PersonRecord[] = [];

  loadRecords(): Promise<PersonRecord[]> {
    return this.http.get("/person/list")
      .toPromise()
      .then(resp => resp.body as Array<any>)
      .then(body => body.map(r => PersonRecord.create(r)));
  }

  async load() {
    try {

      this.loading = true;
      this.list = await this.loadRecords();
      this.loading = false;

    } catch (e) {

      this.loading = false;
      console.error(e);

    }
  }
}
