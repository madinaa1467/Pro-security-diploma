import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import IonicStepperModule from 'ionic-stepper';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../app/shared.module";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";
import {ChildProfile} from "./child-profile";
import {TranslatePipe} from "@ngx-translate/core";

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
    ToastNotificationService,
    TranslatePipe
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

