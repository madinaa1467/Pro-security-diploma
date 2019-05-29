import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../../core/services/moderator.service";
import {EventWeb} from "../../../core/model/EventWeb";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  event: EventWeb;
  placeholder: string = 'assets/images/unknown.png';

  constructor(private moderatorService: ModeratorService) {
    this.moderatorService.getLastEvent().then(res=>{
      this.event = res;
    });
  }

  ngOnInit() {
  }

}
