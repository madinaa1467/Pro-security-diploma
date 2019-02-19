import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {IncomingPage} from './incoming';
import {SharedModule} from "../../app/shared.module";
import {IncomingService} from "./incoming.service";

@NgModule({
  declarations: [
    IncomingPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomingPage),
    SharedModule,
  ],
  providers: [
    IncomingService
  ]
})
export class IncomingPageModule {}
