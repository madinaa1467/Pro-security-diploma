import {Injectable} from "@angular/core";
import {HttpService} from "../../gg-http/services";
import {BehaviorSubject, Observable, of as observableOf} from "rxjs/index";
import {filter, share} from "rxjs/operators";
import {map, tap} from "rxjs/internal/operators";

export class UserInfo {
  public displayName: string;
  public username: string;
  public role: string;
  public cans: Set<string>;

  public static of(a: any): UserInfo {
    const ret: UserInfo = new UserInfo();
    ret.assign(a);
    return ret;
  }

  assign(a: any) {
    this.displayName = a.displayName;
    this.username = a.username;
    this.role = a.role;
    this.cans = (a.cans instanceof Array) ? new Set(a.cans) : new Set();
  }

}

export abstract class UserInfoStorage {
  abstract get(): UserInfo;

  abstract set(user: UserInfo);

  abstract clear();
}

@Injectable()
export class UserInfoLocalStorage extends UserInfoStorage {
  private _userInfo: UserInfo = null;

  constructor() {
    super();
  }

  get(): UserInfo {
    return this._userInfo;
  }

  set(user: UserInfo) {
    this._userInfo = user;
  }

  clear() {
    this._userInfo = null;
  }
}

@Injectable()
export class UserService {
  private userInfo$: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor(private http: HttpService, private userInfoStorage: UserInfoStorage) {
  }

  loadUserInfo(): Observable<UserInfo> {
    return this.http.get('/auth/user-info').pipe(
      map(result => UserInfo.of(result)),
      tap(userInfo => {
        this.userInfoStorage.set(userInfo);
        this.publishStoredUserInfo();
      })
    );
  }

  userInfoChange(): Observable<UserInfo> {
    return this.userInfo$.pipe(
      filter(userInfo => !!userInfo),
      share(),
    );
  }

  protected publishStoredUserInfo() {
    this.userInfo$.next(this.userInfoStorage.get());
  }

  getUserInfo(): Observable<UserInfo> {
    return observableOf(this.userInfoStorage.get());
  }

}
