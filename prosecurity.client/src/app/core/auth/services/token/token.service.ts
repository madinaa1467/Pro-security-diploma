import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {filter, share} from 'rxjs/operators';
import {TokenStorage} from "./token-storage";


@Injectable()
export class TokenService {

  protected token$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(protected tokenStorage: TokenStorage) {
    this.publishStoredToken();
  }

  tokenChange(): Observable<string> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  set(token: string): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  get(): Observable<string> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
