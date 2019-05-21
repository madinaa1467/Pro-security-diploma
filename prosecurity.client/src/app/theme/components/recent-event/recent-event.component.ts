import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {takeWhile} from "rxjs/internal/operators";
import {UserActive, UserActivityData} from "../../../core/data/user-activity";

@Component({
  selector: 'app-recent-event',
  templateUrl: './recent-event.component.html',
  styleUrls: ['./recent-event.component.scss']
})
export class RecentEventComponent implements OnDestroy {
  private alive = true;

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private userActivityService: UserActivityData) {
    this.currentTheme = 'corporate'

    this.getUserActivity(this.type);
  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
