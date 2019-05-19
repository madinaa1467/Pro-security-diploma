import {Injectable, Injector} from '@angular/core';
import {UserService} from "../data/users";
import {GgAuthService} from "../../gg-auth/services";
import {catchError, map, switchMap} from "rxjs/internal/operators";
import {of as observableOf} from 'rxjs';

@Injectable()
export class AppLoaderService {

  constructor(private injector: Injector) {
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

  protected get authService(): GgAuthService {
    return this.injector.get(GgAuthService);
  }

  protected get userService(): UserService {
    return this.injector.get(UserService);
  }

}
