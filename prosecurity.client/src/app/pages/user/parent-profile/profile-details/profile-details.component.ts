import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../../../core/model/auth/user-info";
import {NbDialogService} from "@nebular/theme";
import {UserService} from "../../../../core/data/users";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  user: UserInfo = new UserInfo();
  placeholder: string = 'assets/images/unknown.png';

  constructor(private dialogService: NbDialogService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.userInfoChange().subscribe((userInfo: UserInfo) => {
      this.user = userInfo;
    });
  }

  editProfile() {
    this.dialogService.open(EditProfileComponent, {
      context: {
        user: this.user,
      },
    })
      .onClose.subscribe(res => {
        this.userService.loadUserInfo().subscribe();
      }
    );
  }
}
