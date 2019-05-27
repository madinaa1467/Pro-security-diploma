import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {EditPrivateInfo} from "./edit-private-info";
import IonicStepperModule from "ionic-stepper";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

@NgModule({
  declarations: [
    EditPrivateInfo,
  ],
  imports: [
    IonicPageModule.forChild(EditPrivateInfo),
    SharedModule,
    IonicStepperModule

  ],
  exports: [
    EditPrivateInfo
  ],
  providers: [
    ToastNotificationService
  ]
})
export class EditPrivateInfoModule {}
