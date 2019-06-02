import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Messages} from './messages';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    Messages,
  ],
  imports: [
    IonicPageModule.forChild(Messages),
    SharedModule
  ]
})
export class MessagesModule {
}
