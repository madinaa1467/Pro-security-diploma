import {Injectable} from '@angular/core';
import {Api} from "..";
import {Storage} from "@ionic/storage";
import {TOKEN_KEY} from "./auth.metadata";
import {BehaviorSubject} from "rxjs";
import {AccountInfo} from "../../model/auth/account-info";
import {ToSave} from "../../model/ToSave";
import {NotificationProvider} from "../notification/notification";


@Injectable()
export class Auth {

  private _accountInfo: AccountInfo;
  readonly accountInfoChanges$ = new BehaviorSubject(new AccountInfo());


  get accountInfo(): AccountInfo {
    return this._accountInfo;
  }

  authenticationState = new BehaviorSubject(false);

  constructor(private api: Api, private notification: NotificationProvider, private storage: Storage) {
  }

  login(credentials) {
    console.log('Call auth/login credentials: ', credentials);
    return this.api.post('auth/login', credentials, {
      responseType: 'text'
    }).toPromise().then(res => {
      return this.storage.set(TOKEN_KEY, res).then(() => {

        return this.loadAccountInfo().then(res=>{

          this.notification.register();

          return res;
        });
      });
    });
  }

  logout() {

    this.notification.unregister().then(res => {
      return this.storage.remove(TOKEN_KEY).then(res => {
      this._accountInfo = null;
      this.authenticationState.next(false);
      });
    });
  }

  authenticated(): Promise<boolean> {
    return this.getToken().then(res => {
      let isAuthenticated: boolean = !!res;
      this.authenticationState.next(isAuthenticated);
      return isAuthenticated;
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getToken(): Promise<any> {
    return this.storage.get(TOKEN_KEY);
  }

  loadAccountInfo() {
    return this.api.get('auth/accountInfo')
      .toPromise().then(res => {
        this.setAccountInfo(res);
        this.authenticationState.next(true);
        return this._accountInfo;
    });
  }

  register(toSave){
    return this.api.post('parent/register', {toSave: JSON.stringify(ToSave.create(toSave))})
      .toPromise().then(res => res);
  }

  setAccountInfo(res: any) {
    this._accountInfo = AccountInfo.create(res);
    this.accountInfoChanges$.next(this._accountInfo);
  }

}
