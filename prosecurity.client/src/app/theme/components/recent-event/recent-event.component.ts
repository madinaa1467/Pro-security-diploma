import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../core/data/users";
import {EventFilterWeb} from "../../../core/model/EventFilterWeb";
import {ModeratorService} from "../../../core/services/moderator.service";

@Component({
  selector: 'app-recent-event',
  templateUrl: './recent-event.component.html',
  styleUrls: ['./recent-event.component.scss']
})
export class RecentEventComponent implements OnDestroy, OnInit {
  private alive = true;

  filter: EventFilterWeb = new EventFilterWeb;
  placeholder: string = 'assets/images/unknown.png';
  recent = [];

  type = 'week';
  types = ['week', 'month', 'year'];

  constructor(private userService: UserService,
              private moderatorService: ModeratorService) {
    this.filter.startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    this.filter.endDate = new Date();
    this.filter.offset = 0;
    this.filter.limit = 20;
    this.moderatorService.getRecentEvents(this.filter).then(
      res => {
        this.recent = res;
      }
    );
  }

  getUserActivity(period: string) {
    console.log('period:', period);
    if(period == 'week'){
      this.filter.startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }
    if(period == 'month'){
      this.filter.startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    if(period == 'year'){
      this.filter.startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    }
    this.filter.offset = 0;
    this.moderatorService.getRecentEvents(this.filter).then(
      res => {
        this.recent = res;
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(): void {

  }

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);

    this.filter.offset += 20;

    this.moderatorService.getRecentEvents(this.filter).then(
      res => {
        res.forEach(d => this.recent.push(d));
      }
    );

    this.direction = 'down'
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
    this.direction = 'up';
  }


}
