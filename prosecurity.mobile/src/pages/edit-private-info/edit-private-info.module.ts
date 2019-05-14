import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {EditPrivateInfo} from "./edit-private-info";
import IonicStepperModule from "ionic-stepper";

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
  ]
})
export class EditPrivateInfoModule {}
