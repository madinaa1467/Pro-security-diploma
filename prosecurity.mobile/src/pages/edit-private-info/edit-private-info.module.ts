import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {EditPrivateInfo} from "./edit-private-info";
import IonicStepperModule from "ionic-stepper";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";
import {TranslateModule, TranslatePipe} from "@ngx-translate/core";

@NgModule({
  declarations: [
    EditPrivateInfo,
  ],
  imports: [
    IonicPageModule.forChild(EditPrivateInfo),
    SharedModule,
    IonicStepperModule,
    TranslateModule

  ],
  exports: [
    EditPrivateInfo
  ],
  providers: [
    ToastNotificationService,
    TranslatePipe
  ]

})
export class EditPrivateInfoModule {}
