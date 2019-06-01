import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CanIChecker} from "../../security";
import {Observable} from "rxjs/index";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private canIChecker: CanIChecker, private router: Router) {
  }

  canActivate() {
    let asd: Observable<boolean> = this.canIChecker.canI("USER");

    return asd.pipe(
      tap(res => console.log('res:', res))
    );
  }
}
