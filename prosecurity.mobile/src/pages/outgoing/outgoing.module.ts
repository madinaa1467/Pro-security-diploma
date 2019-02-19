import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutgoingPage } from './outgoing';

@NgModule({
  declarations: [
    OutgoingPage,
  ],
  imports: [
    IonicPageModule.forChild(OutgoingPage),
  ],
})
export class OutgoingPageModule {}
