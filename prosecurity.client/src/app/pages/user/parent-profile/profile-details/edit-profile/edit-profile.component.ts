import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {UserInfo} from "../../../../../core/model/auth/user-info";
import {ParentService} from "../../../../../core/services/parent.service";
import {ParentDetails} from "../../../../../core/model/parent-details";
import {GenderType, genderTypes} from "../../../../../core/model/gender/gender-type";
import {PhoneType, phoneTypes} from "../../../../../core/model/phone/phone-type";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input()
  user: UserInfo;
  parent: ParentDetails;
  phones: [] = [];
  public phoneTypes: PhoneType[] = phoneTypes;
  public genderTypes: GenderType[] = genderTypes;

  constructor(protected ref: NbDialogRef<EditProfileComponent>,
              private parentService: ParentService) {
    // if(! this.user) {
    //   this.user = new UserInfo();
    // }
  }

  ngOnInit() {
    this.parentService.loadParentInfo().then((list: ParentDetails) => {
      this.parent = list;
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {

    this.parentService.saveProfile(this.parent).then(res => {
      alert(`Profile successfully changed!`);
      this.cancel();
    }).catch(err => {
      if (err.status == 400) {
        let errors = err.error;
        alert(`Error, Try again!`);

        return;
      }
    });
  }
}
