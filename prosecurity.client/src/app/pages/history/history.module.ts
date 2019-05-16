import {NgModule} from '@angular/core';

import {HistoryRoutingModule} from './history-routing.module';
import {HistoryComponent} from './history.component';
import {ThemeModule} from "../../theme/theme.module";
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    ThemeModule,
    HistoryRoutingModule,
    Ng2SmartTableModule
  ]
})
export class HistoryModule {}
