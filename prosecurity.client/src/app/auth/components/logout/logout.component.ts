import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {map, switchMap} from "rxjs/internal/operators";
import {AuthService} from "../../../core/auth/services";
import {UserService} from "../../../core/data/users";
import {MessagingService} from "../../../core/utils";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private service: AuthService,
              private userService: UserService,
              private messagingService: MessagingService,
              private router: Router) { }

  ngOnInit() {
    this.logout();
  }

  private logout() {
    this.service.logout().pipe(
      switchMap(result => {
        return this.userService.clear().pipe(
          switchMap(() => {
            return this.messagingService.unregister().pipe(map(() => result))
          })
        )
      })
    ).subscribe(result => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
