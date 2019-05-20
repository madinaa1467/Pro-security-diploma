import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./services";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
