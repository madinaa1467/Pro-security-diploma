/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';
import {TokenService} from './token/token.service';
import {switchMap} from "rxjs/internal/operators";
import {HttpService} from "../../../http/services";
import {Observable} from 'rxjs';


@Injectable()
export class AuthService {

  constructor(private http: HttpService, private tokenService: TokenService) {
  }

  getToken(): Observable<string> {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((token: string) => !!token));
  }

  onTokenChange(): Observable<string> {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange()
      .pipe(map((token: string) => !!token));
  }

  authenticate(credentials): Observable<string> {
    return this.http.post('/auth/login', credentials, {responseType: 'text'})
      .pipe(
        switchMap((res: string) => {
            return this.processResultToken(res)
          }
        )
      );
  }

  register(data?: any): Observable<string> {
    return null;
    /*return this.getStrategy(strategyName).register(data)
      .pipe(
        switchMap((result: GgAuthResult) => {
          return this.processResultToken(result);
        }),
      );*/
  }

  logout(): Observable<any> {
    // TODO: msultanova 5/20/19 internet connection
    return this.http.get('/auth/exit').pipe(
      switchMap(() => this.tokenService.clear())
    );
  }

  requestPassword(data?: any): Observable<string> {
    return null;
    //return this.getStrategy(strategyName).requestPassword(data);
  }

  resetPassword(data?: any): Observable<string> {
    return null;
    //return this.getStrategy(strategyName).resetPassword(data);
  }

  private processResultToken(token: string) {
    return this.tokenService.set(token)
      .pipe(
        map((res: string) => {
          return token;
        }),
      );
  }
}
