import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Auth} from "./auth";
import {_throw} from "rxjs/observable/throw";
import {catchError} from "rxjs/operators";
import {AlertController} from "ionic-angular";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: Auth) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.auth.getToken();

    return Observable.fromPromise(promise).mergeMap(token => {
      let cloneReq = this.addToken(req, token);

      return next.handle(cloneReq).pipe(
        catchError(error => {
          console.log("AuthInterceptor:",error);
          if (error.status === 401) {
            this.auth.logout();
          }

          /*let msg = error.message;

          let alert = this.alertCtrl.create({
            title: error.name,
            message: msg,
            buttons: ['OK']
          });
          alert.present();*/


          return _throw(error);
        })
      );
    });
  }

  private addToken(req: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = req.clone({
        setHeaders: {
          token: `${token}`
        }
      });

      return clone;
    }
    return req;
  }
}
