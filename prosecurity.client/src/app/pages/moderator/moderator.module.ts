import {forwardRef, NgModule} from '@angular/core';

import {ModeratorRoutingModule} from './moderator-routing.module';
import {ModeratorComponent} from './moderator.component';
import {ThemeModule} from '../../theme/theme.module';
import {EventHistoryTableComponent} from './event-history-table/event-history-table.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';
import {
  NbAccordionModule,
  NbDatepickerModule,
  NbSelectModule
} from "@nebular/theme";

@NgModule({
  declarations: [ModeratorComponent, EventHistoryTableComponent, ProfileInfoComponent],
  imports: [
    ThemeModule,
    ModeratorRoutingModule,
    NbAccordionModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
  ]
})
export class ModeratorModule { }
