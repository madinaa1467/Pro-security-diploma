import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  type = 'month';
  types = ['week', 'month', 'year'];

  currentTheme: string;

  constructor() { }

  ngOnInit() {
    this.currentTheme = 'corporate'
  }

  getEventActivity(type: string) {
    console.log('type:', type);
  }
}
