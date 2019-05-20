import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "./services/index";
import {_throw} from "rxjs/observable/throw";


@Injectable()
export class AuthSimpleInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getToken().pipe(
      switchMap(token => {
        if (!!token) {
          req = req.clone({
            setHeaders: {
              token: token,
            },
          });
        }
        return next.handle(req);
      }),
      catchError(err => {
        if (err.status === 401) this.router.navigateByUrl('/auth/logout');

        return _throw(err);
      })
    );

    /*return this.authService.getToken().pipe(
      switchMap((token: string) => {

        if (!!token) {
          req = req.clone({
            setHeaders: {
              token: token,
            },
          });
        }

        return next.handle(req);
      }),
      catchError(error => {
        if (error.status === 401) this.router.navigateByUrl('/auth/logout');

        return _throw(error);
      })
    );*/
  }
}
