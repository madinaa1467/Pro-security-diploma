import {NgModule} from '@angular/core';

import {ParentInfoRoutingModule} from './parent-info-routing.module';
import {ParentInfoComponent} from './parent-info.component';
import {ParentProfileComponent} from "./parent-profile/parent-profile.component";
import {ChildEventListComponent} from './child-event-list/child-event-list.component';
import {ThemeModule} from "../../theme/theme.module";

@NgModule({
  declarations: [ParentInfoComponent, ParentProfileComponent, ChildEventListComponent],
  imports: [
    ThemeModule,
    ParentInfoRoutingModule
  ]
})
export class ParentInfoModule {}
