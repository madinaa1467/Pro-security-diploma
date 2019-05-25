import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfile } from './edit-profile';
import {SharedModule} from "../../app/shared.module";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

@NgModule({
  declarations: [
    EditProfile,
  ],
  imports: [
    IonicPageModule.forChild(EditProfile),
    SharedModule
  ],
  exports: [
    EditProfile
  ],
  providers: [
    ToastNotificationService
  ]
})
export class EditProfileModule {}
