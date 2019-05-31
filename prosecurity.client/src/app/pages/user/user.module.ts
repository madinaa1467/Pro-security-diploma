import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {ThemeModule} from "../../theme/theme.module";
import {NbAccordionModule, NbDatepickerModule, NbSelectModule} from "@nebular/theme";

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ThemeModule,
    NbAccordionModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
  ]
})
export class UserModule { }
