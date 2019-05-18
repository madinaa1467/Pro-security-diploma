import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {EventDetail} from "./event-detail";

@NgModule({
  declarations: [
    EventDetail,
  ],
  imports: [
    IonicPageModule.forChild(EventDetail),
    SharedModule
  ],
  exports: [
    EventDetail
  ]
})
export class EventDetailModule {}
