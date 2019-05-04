import {Injectable} from '@angular/core';
import {Auth} from "..";
import {USERNAME} from "../auth/auth.metadata";
import {Storage} from "@ionic/storage";
import {AccountInfo} from "../../model/auth/account-info";
import {BehaviorSubject} from "../../../node_modules/rxjs";

@Injectable()
export class AppLoader {

  constructor(private auth: Auth) {
  }

  initApp(): Promise<any> {

    return this.auth.authenticated().then(res => {
      if (res) {
        return this.auth.loadAccountInfo().catch(error => {
          console.error("Произошла ошибка при загрузки данный сессии", error);
        });
      }
    });
  }
}
