import {NgModule} from '@angular/core';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ThemeModule} from "../../theme/theme.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ThemeModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
