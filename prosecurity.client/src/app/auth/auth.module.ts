import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {ThemeModule} from "../theme/theme.module";
import {AuthBlockComponent, AuthComponent, LoginComponent} from "./components";
import {LogoutComponent} from './components/logout/logout.component';
import {RegisterComponent} from './components/register/register.component';
import {NbDatepickerModule, NbSelectModule} from "@nebular/theme";

const COMPONENTS = [AuthBlockComponent, AuthComponent, LoginComponent, LogoutComponent, RegisterComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ThemeModule,
    AuthRoutingModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule
  ]
})
export class AuthModule {}
