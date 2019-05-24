import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModeratorRoutingModule} from './moderator-routing.module';
import {ModeratorComponent} from './moderator.component';
import {ThemeModule} from '../../theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EventHistoryTableComponent} from './event-history-table/event-history-table.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';

@NgModule({
  declarations: [ModeratorComponent, EventHistoryTableComponent, ProfileInfoComponent],
  exports: [
    EventHistoryTableComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ModeratorRoutingModule
  ]
})
export class ModeratorModule { }
