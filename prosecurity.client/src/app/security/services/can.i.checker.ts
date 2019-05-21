import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CanIProvider} from "./can.i.provider";
import {isNullOrUndefined} from "util";

@Injectable()
export class CanIChecker {

  constructor(protected canIProvider: CanIProvider) {
  }

  canI(permission: string | string[]): Observable<boolean> {
    return this.canIProvider.getCans()
      .pipe(
        map((cans: Set<string>) => {
          if (isNullOrUndefined(permission)) return false;

          permission = Array.isArray(permission) ? permission : [permission];
          return permission.some(permitted => cans.has(permitted));
        }),
      );
  }
}
