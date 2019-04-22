import {Injectable} from '@angular/core';
import {Auth} from "..";
import {USERNAME} from "../auth/auth.metadata";
import {Storage} from "@ionic/storage";
import {AccountInfo} from "../../model/auth/account-info";
import {BehaviorSubject} from "../../../node_modules/rxjs";

@Injectable()
export class AppLoader {

  constructor(private auth: Auth, private storage: Storage) {
  }
  private _accountInfo: AccountInfo;
  authenticationState = new BehaviorSubject(false);


  get accountInfo(): AccountInfo {
    return this._accountInfo;
  }

  initApp(): Promise<any> {
    // todo should send token
    return this.auth.authenticated().then(res => {
      if (res) {
        this.storage.get(USERNAME).then((val) => {
          this._accountInfo = AccountInfo.create(this.auth.loadAccountInfo(val).catch(error => {
            console.error("Произошла ошибка при загрузки данный сессии", error);
            this.auth.logout();
          }));
        });
      }
    });
  }
}
