import {CanIProvider} from "../../security/index";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {UserInfo, UserService} from "../data/users";
import {map} from "rxjs/internal/operators";

@Injectable()
export class CustomCanIProvider implements CanIProvider {
  constructor(private userService: UserService) {
  }

  getCans(): Observable<Set<string>> {
    return this.userService.userInfoChange().pipe(
      map((userInfo: UserInfo) => {
        console.log('userInfo:', userInfo);
        return userInfo.cans;
      })
    );
  }
}
