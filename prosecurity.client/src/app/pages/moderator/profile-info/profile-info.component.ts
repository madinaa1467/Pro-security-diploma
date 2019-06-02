import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../../core/services/moderator.service";
import {EventWeb} from "../../../core/model/EventWeb";
import {MessagingService} from "../../../core/utils";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  event: EventWeb = new EventWeb();

  placeholder: string = 'assets/images/unknown.png';

  constructor(private moderatorService: ModeratorService,
              private messagingService: MessagingService) {
  }

  ngOnInit() {

    this.moderatorService.getLastEvent().then(res => {
      this.event = res;
      console.log('event:', this.event);
    });

    this.messagingService.onMessage().subscribe(res => {
      this.moderatorService.getLastEvent().then(res => {
        this.event = res;
        console.log('event:', this.event);
      });
    });
  }

}
