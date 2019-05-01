import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfile } from './edit-profile';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    EditProfile,
  ],
  imports: [
    IonicPageModule.forChild(EditProfile),
    SharedModule
  ],
  exports: [
    EditProfile
  ]
})
export class EditProfileModule {}
