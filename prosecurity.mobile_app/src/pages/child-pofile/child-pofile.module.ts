import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildPofile } from './child-pofile';

@NgModule({
  declarations: [
    ChildPofile,
  ],
  imports: [
    IonicPageModule.forChild(ChildPofile),
  ],
})
export class ChildPofilePageModule {}
