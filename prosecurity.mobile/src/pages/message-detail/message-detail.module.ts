import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetail } from './message-detail';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    MessageDetail,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetail),
    SharedModule
  ],
  exports: [
    MessageDetail
  ]
})
export class MessageDetailModule {}
