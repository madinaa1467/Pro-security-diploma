import {Component, OnDestroy} from '@angular/core';
import {RecentUsers, UserService} from "../../../core/data/users";
import {takeWhile} from "rxjs/internal/operators";

@Component({
  selector: 'app-recent-event',
  templateUrl: './recent-event.component.html',
  styleUrls: ['./recent-event.component.scss']
})
export class RecentEventComponent implements OnDestroy {
  private alive = true;

  recent: any[];

  type = 'month';
  types = ['week', 'month', 'year'];

  constructor(private userService: UserService) {
    this.userService.getRecentUsers()
      .pipe(takeWhile(() => this.alive))
      .subscribe((recent: RecentUsers[]) => this.recent = recent);

  }

  getUserActivity(period: string) {
    console.log('period:', period);
    /*this.userActivityService.getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });*/
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
