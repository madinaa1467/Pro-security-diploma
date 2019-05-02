import {Injectable} from '@angular/core';
import {Api} from "..";
import {Storage} from "@ionic/storage";
import {TOKEN_KEY, USERNAME} from "./auth.metadata";
import {BehaviorSubject} from "rxjs";
import {AccountInfo} from "../../model/auth/account-info";
import {ToSave} from "../../model/ToSave";


@Injectable()
export class Auth {

  private _accountInfo: AccountInfo;


  get accountInfo(): AccountInfo {
    return this._accountInfo;
  }

  authenticationState = new BehaviorSubject(false);

  constructor(private api: Api, private storage: Storage) {
  }

  login(credentials) {
    console.log('Call auth/login credentials: ', credentials);
    return this.api.post('auth/login', credentials, {
      responseType: 'text'
    }).toPromise().then(res => {
      return this.storage.set(TOKEN_KEY, res).then(() => {
        return this.loadAccountInfo();
      });
    });
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(res => {
      this._accountInfo = null;
      this.authenticationState.next(false);
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
        this._accountInfo = AccountInfo.create(res);
      this.authenticationState.next(true);
      return this._accountInfo;
    });
  }

  register(toSave: ToSave){
    console.log('Call parent/register toSave:', toSave);
    return this.api.post('parent/register', {toSave: JSON.stringify(toSave)})
      .toPromise().then(res => {
        console.log("Response from parent/register:  ", res);
      });
  }


}
