import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import {EventDetail} from "./event-detail";
import {ParallaxHeaderDirectiveModule} from "../../components/parallax-header/parallax-header.module";

@NgModule({
  declarations: [
    EventDetail,
  ],
  imports: [
    IonicPageModule.forChild(EventDetail),
    SharedModule,
    ParallaxHeaderDirectiveModule
  ],
  exports: [
    EventDetail
  ]
})
export class EventDetailModule {}
