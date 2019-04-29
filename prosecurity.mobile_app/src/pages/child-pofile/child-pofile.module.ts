import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildPofilePage } from './child-pofile';

@NgModule({
  declarations: [
    ChildPofilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChildPofilePage),
  ],
})
export class ChildPofilePageModule {}
