import {CanIProvider} from "../../security/index";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {UserService} from "../data/users";
import {map} from "rxjs/internal/operators";
import {UserInfo} from "../model/auth/user-info";

@Injectable()
export class CustomCanIProvider implements CanIProvider {
  constructor(private userService: UserService) {
  }

  getCans(): Observable<Set<string>> {
    return this.userService.userInfoChange().pipe(
      map((userInfo: UserInfo) => userInfo.cans)
    );
  }
}
