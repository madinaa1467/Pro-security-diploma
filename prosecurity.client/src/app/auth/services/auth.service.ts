/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Injectable} from '@angular/core';

import {Observable, of as observableOf} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {TokenService} from './token/token.service';


@Injectable()
export class AuthService {

  constructor(protected tokenService: TokenService) {
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

  authenticate(string, data?: any): Observable<string> {
    return this.getStrategy(strategyName).authenticate(data)
      .pipe(
        switchMap((result: GgAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  register(data?: any): Observable<GgAuthResult> {
    return this.getStrategy(strategyName).register(data)
      .pipe(
        switchMap((result: GgAuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  logout(): Observable<GgAuthResult> {
    return this.getStrategy(strategyName).logout()
      .pipe(
        switchMap((result: GgAuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear()
              .pipe(map(() => result));
          }
          return observableOf(result);
        }),
      );
  }

  requestPassword(data?: any): Observable<GgAuthResult> {
    return this.getStrategy(strategyName).requestPassword(data);
  }

  resetPassword(data?: any): Observable<GgAuthResult> {
    return this.getStrategy(strategyName).resetPassword(data);
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
