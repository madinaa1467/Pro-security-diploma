import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ParentInfoRoutingModule} from './parent-info-routing.module';
import {ParentInfoComponent} from './parent-info.component';

@NgModule({
  declarations: [ParentInfoComponent],
  imports: [
    CommonModule,
    ParentInfoRoutingModule
  ]
})
export class ParentInfoModule {}
