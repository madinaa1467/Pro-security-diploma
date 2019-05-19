import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CanIProvider} from "./can.i.provider";

@Injectable()
export class CanIChecker {

  constructor(protected canIProvider: CanIProvider) {
  }

  canI(permission: string[]): Observable<boolean> {
    return this.canIProvider.getCans()
      .pipe(
        map((cans: Set<string>) => permission.some(permitted => cans.has(permitted))),
      );
  }
}
