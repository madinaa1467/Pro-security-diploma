import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginPage} from './login';
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    TranslateModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
