import {NgModule} from '@angular/core';

import {ModeratorRoutingModule} from './moderator-routing.module';
import {ModeratorComponent} from './moderator.component';
import {ThemeModule} from '../../theme/theme.module';
import {EventHistoryTableComponent} from './event-history-table/event-history-table.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';

@NgModule({
  declarations: [ModeratorComponent, EventHistoryTableComponent, ProfileInfoComponent],
  imports: [
    ThemeModule,
    ModeratorRoutingModule
  ]
})
export class ModeratorModule { }
