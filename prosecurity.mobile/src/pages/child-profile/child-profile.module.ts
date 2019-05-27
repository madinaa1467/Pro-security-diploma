import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import IonicStepperModule from 'ionic-stepper';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../app/shared.module";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";
import {ChildProfile} from "./child-profile";

@NgModule({
  declarations: [
    ChildProfile,
  ],
  imports: [
    IonicPageModule.forChild(ChildProfile),
    IonicStepperModule,
    CommonModule,
    SharedModule,
  ],
  providers: [
    ToastNotificationService
  ],
  entryComponents: [
    ChildProfile
  ],
  exports: [
    ChildProfile
  ]
})
export class ChildProfilePageModule {
}

