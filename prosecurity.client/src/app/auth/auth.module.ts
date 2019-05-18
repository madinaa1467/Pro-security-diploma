import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {ThemeModule} from "../theme/theme.module";
import {AuthBlockComponent, AuthComponent, LoginComponent} from "./components";
import {LogoutComponent} from './components/logout/logout.component';
import {RegisterComponent} from './components/register/register.component';

const COMPONENTS = [AuthBlockComponent, AuthComponent, LoginComponent, LogoutComponent, RegisterComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ThemeModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
