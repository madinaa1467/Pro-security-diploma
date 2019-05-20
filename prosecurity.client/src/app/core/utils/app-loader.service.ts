import {Injectable} from '@angular/core';
import {UserService} from "../data/users";
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {of as observableOf} from 'rxjs';
import {AuthService} from "../auth/services";

@Injectable()
export class AppLoaderService {

  constructor(private authService: AuthService, private userService: UserService) {
  }

  initApp() {
    return this.authService.isAuthenticated().pipe(
      switchMap(authenticated => {
        if (!authenticated) return observableOf(authenticated);

        return this.userService.loadUserInfo().pipe(
          map(res => authenticated),
          catchError(err => {
            console.error("Произошла ошибка при загрузки данный сессии")
            return observableOf(authenticated);
          })
        );
      })
    ).toPromise();
  }

}
