import {Inject, Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {GG_AUTH_INTERCEPTOR_HEADER} from "../../gg-auth";
import {Observable} from "rxjs";
import {GgAuthService} from "../../gg-auth/services";
import {catchError, switchMap} from "rxjs/operators";
import {_throw} from "rxjs/observable/throw";
import {GgAuthJWTToken} from "../../gg-auth/services/token/token";
import {Router} from "@angular/router";


@Injectable()
export class AuthSimpleInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              @Inject(GG_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getToken().pipe(
      switchMap((token: GgAuthJWTToken) => {

        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: token.getValue(),
            },
          });
        }

        return next.handle(req);
      }),
      catchError(error => {
        if (error.status === 401) this.router.navigateByUrl('/auth/logout');

        return _throw(error);
      })
    );
  }

  protected get authService(): GgAuthService {
    return this.injector.get(GgAuthService);
  }

  protected get router(): Router {
    return this.injector.get(Router);
  }
}
