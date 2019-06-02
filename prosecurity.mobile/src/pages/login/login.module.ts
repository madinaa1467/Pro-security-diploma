import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginPage} from './login';
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslatePipe} from "@ngx-translate/core";
import {ToastNotificationService} from "../../providers/services/toast-notification.service";

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
  ],
  providers: [
    ToastNotificationService,
    TranslatePipe
  ]
})
export class LoginPageModule {}
