import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/services";
import {UserService} from "../../../core/data/users";
import {catchError, switchMap, tap} from "rxjs/internal/operators";
import {UserInfo} from "../../../core/model/auth/user-info";
import {MessagingService} from "../../../core/utils";

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
              private userService: UserService,
              private messagingService: MessagingService) { }

  ngOnInit() {
  }

  login(): void {
    this.errors = [];
    this.submitted = true;
    // TODO: msultanova 5/20/19 future tips add AuthResult.ts for correct password strategy
    this.service.authenticate(this.user).pipe(
      switchMap(res => {
        return this.userService.loadUserInfo().pipe(
          tap(userInfo => {
            this.messagingService.requestPermission().subscribe()
          })
        )
      }),
      catchError(err => {
        this.submitted = false;
        this.errors.push(err.error);
        this.cd.detectChanges();
        console.error('login:', err);
        return err;
      })
    ).subscribe((res: UserInfo) => {
      console.log('res:', res);
      this.submitted = false;
      if (['MODERATOR'].some(permitted => res.cans.has(permitted))) {
        this.router.navigateByUrl("/pages/moderator");
      } else if (['USER'].some(permitted => res.cans.has(permitted))) {
        this.router.navigateByUrl("/pages/user");
      } else {
        this.router.navigateByUrl("/pages");
      }

      this.cd.detectChanges();
    })
  }

  getConfigValue(key: string): any {
    return "";
    //return getDeepFromObject(this.options, key, null);
  }
}
