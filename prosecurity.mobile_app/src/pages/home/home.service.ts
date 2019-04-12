import {Injectable} from '@angular/core';
import {Api} from "../../providers";
import {ChildEvents} from "../../model/ChildEvents";
import {TOKEN_KEY} from "../../providers/auth/auth.metadata";
// import {HttpService} from "../http.service";
// import {PersonRecord} from "../../model/PersonRecord";

@Injectable()
export class HomeService {
  constructor(private http: Api) {}

  public loading: boolean = false;

  public list: ChildEvents[] = [];

  loadEvents(): Promise<ChildEvents[]> {
    return this.http.get("/person/list")
      .toPromise()
      .then(resp =>  {

        if(!resp) return resp;

        return (<any> resp).map((r) =>
        ChildEvents.create(r)
      );
      });
  }

  ///return this.api.post('auth/login', credentials, {
  //       responseType: 'text'
  //     }).toPromise().then(res => {
  //       return this.storage.set(TOKEN_KEY, res).then(() => {
  //         // return this.getPersonDisplay();
  //         this.authenticationState.next(true);
  //
  //       });
  //     });

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
