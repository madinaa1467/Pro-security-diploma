import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {ThemeModule} from "../theme/theme.module";
import {AuthBlockComponent, AuthComponent, LoginComponent} from "./components";

const COMPONENTS = [AuthBlockComponent, AuthComponent, LoginComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ThemeModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
