import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildPofile } from './child-pofile';
import IonicStepperModule from "ionic-stepper";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../app/shared.module";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

@NgModule({
  declarations: [
    ChildPofile,
  ],
  imports: [
    IonicPageModule.forChild(ChildPofile),
    IonicStepperModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    ToastNotificationService
  ]
})
export class ChildPofilePageModule {}
