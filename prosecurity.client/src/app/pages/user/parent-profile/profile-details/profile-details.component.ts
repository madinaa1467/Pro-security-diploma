import { Component, OnInit } from '@angular/core';
import {UserInfo} from "../../../../core/model/auth/user-info";
import {NbDialogService} from "@nebular/theme";
import {UserService} from "../../../../core/data/users";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  user: UserInfo;
  placeholder: string = 'assets/images/unknown.png';

  constructor(private dialogService: NbDialogService, private userService: UserService) {
    this.userService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.user = userInfo;
    });
  }

  ngOnInit() {
  }

}
