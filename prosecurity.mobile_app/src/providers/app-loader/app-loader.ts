import {Injectable} from '@angular/core';
import {Auth} from "..";
import {USERNAME} from "../auth/auth.metadata";
import {Storage} from "@ionic/storage";
import {AccountInfo} from "../../model/auth/account-info";

@Injectable()
export class AppLoader {

  constructor(private auth: Auth, private storage: Storage) {
  }
  private accountInfo: AccountInfo;

  initApp(): Promise<any> {
    // todo should send token
    return this.auth.authenticated().then(res => {
      if (res) {
        this.storage.get(USERNAME).then((val) => {
          this.accountInfo = AccountInfo.create(this.auth.loadAccountInfo(val).catch(error => {
            console.error("Произошла ошибка при загрузки данный сессии", error);
            this.auth.logout();
          }));
        });
      }
    });
  }
}
