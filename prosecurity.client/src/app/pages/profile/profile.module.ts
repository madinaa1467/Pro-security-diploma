import {NgModule} from '@angular/core';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ThemeModule} from "../../theme/theme.module";
import {EventHistoryComponent} from './event-history/event-history.component';

const COMPONENTS = [ProfileComponent, EventHistoryComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ThemeModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
