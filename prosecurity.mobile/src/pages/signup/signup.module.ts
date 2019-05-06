import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule,
    SharedModule
  ],
})
export class SignupPageModule {}
