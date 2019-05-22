import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of as observableOf} from "rxjs/index";
import {filter, share} from "rxjs/operators";
import {map, tap} from "rxjs/internal/operators";
import {HttpService} from "../../http/services";

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

  clear(): Observable<null> {
    this.userInfoStorage.clear();
    this.publishStoredUserInfo();
    return observableOf(null);
  }

  protected publishStoredUserInfo() {
    this.userInfo$.next(this.userInfoStorage.get());
  }

  getUserInfo(): Observable<UserInfo> {
    return observableOf(this.userInfoStorage.get());
  }

  // TODO: msultanova 5/21/19 remove fake data
  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }

  // TODO: msultanova 5/21/19 remove fake data
  private time: Date = new Date;

  private users = {
    nick: {name: 'Nick Jones', picture: 'assets/images/nick.png'},
    eva: {name: 'Eva Moor', picture: null},
    jack: {name: 'Jack Williams', picture: null},
    lee: {name: 'Lee Wong', picture: null},
    alan: {name: 'Alan Thompson', picture: null},
    kate: {name: 'Kate Martinez', picture: null},
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };

  private recentUsers: RecentUsers[] = [
    {user: this.users.alan, type: this.types.home, time: this.time.setHours(21, 12)},
    {user: this.users.eva, type: this.types.home, time: this.time.setHours(17, 45)},
    {user: this.users.nick, type: this.types.mobile, time: this.time.setHours(5, 29)},
    {user: this.users.lee, type: this.types.mobile, time: this.time.setHours(11, 24)},
    {user: this.users.jack, type: this.types.mobile, time: this.time.setHours(10, 45)},
    {user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 42)},
    {user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 31)},
    {user: this.users.jack, type: this.types.mobile, time: this.time.setHours(8, 0)},
  ];

}

// TODO: msultanova 5/21/19 remove fake data
export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}
