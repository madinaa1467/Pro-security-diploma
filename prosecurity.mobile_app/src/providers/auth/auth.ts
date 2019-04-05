import {Injectable} from '@angular/core';
import {Api} from "..";
import {Storage} from "@ionic/storage";
import {TOKEN_KEY} from "./auth.metadata";
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "../../model/auth/user-info";
import {AccountInfo} from "../../model/auth/account-info";
import {PersonDisplay} from "../../model/PersonDisplay";


@Injectable()
export class Auth {

  private _userInfo: UserInfo;
  private _accountInfo: AccountInfo;

  authenticationState = new BehaviorSubject(false);

  constructor(private api: Api, private storage: Storage) {
  }

  login(credentials) {
    console.log("credentials:", credentials);
    return this.api.post('auth/login', credentials, {
      responseType: 'text'
    }).toPromise().then(res => {
      return this.storage.set(TOKEN_KEY, res).then(() => {
        // return this.getPersonDisplay();
        this.authenticationState.next(true);

      });
    });
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(res => {
      this._userInfo = null;
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

  loadUserInfo() {
    return this.api.get('userInfo').toPromise().then(res => {
      this._userInfo = UserInfo.create(res);
      this._accountInfo = AccountInfo.create(this._userInfo);
      this.authenticationState.next(true);
      return this._userInfo;
    });
  }

  get accountInfo(): AccountInfo {
    return this._accountInfo;
  }

  getPersonDisplay(): Promise<PersonDisplay> {
    return this.api.get('auth/displayPerson')
      .toPromise()
      .then(res => {
        console.log("res:", res);
        this.authenticationState.next(true);
        return PersonDisplay.of(res)
      });
  }


}
