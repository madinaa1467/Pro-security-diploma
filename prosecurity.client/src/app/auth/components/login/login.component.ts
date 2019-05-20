import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/services";
import {UserService} from "../../../core/data/users";
import {catchError, map, switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  showMessages: any = {};

  errors: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(private cd: ChangeDetectorRef,
              private router: Router,
              private service: AuthService,
              private userService: UserService) { }

  ngOnInit() {
  }

  login(): void {
    this.errors = [];
    this.submitted = true;
    this.service.authenticate(this.user).pipe(
      switchMap(result => {
        return this.userService.loadUserInfo().pipe(
          map(() => result)
        )
      }),
      catchError(err => {
        console.error('err:', err);
        this.errors.push(err.error);
        this.cd.detectChanges();
        return err;
      })
    ).subscribe(res => {
      this.cd.detectChanges();
      console.log('res:', res);
    })
  }

  getConfigValue(key: string): any {
    return "";
    //return getDeepFromObject(this.options, key, null);
  }
}
