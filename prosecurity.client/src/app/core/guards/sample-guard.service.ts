import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CanIChecker} from "../../security";
import {Observable} from "rxjs/index";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class SampleGuard implements CanActivate {

  constructor(private canIChecker: CanIChecker, private router: Router) {
  }

  canActivate() {
    let asd: Observable<boolean> = this.canIChecker.canI("VIEW_PARENT");

    return asd.pipe(
      tap(res => console.log('res:', res))
    );
  }
}
