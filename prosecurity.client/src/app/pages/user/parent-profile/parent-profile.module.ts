import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentProfileRoutingModule } from './parent-profile-routing.module';
import {ParentProfileComponent} from "./parent-profile.component";
import {ThemeModule} from "../../../theme/theme.module";
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ChildEditComponent } from './child-details/child-edit/child-edit.component';
import {NbDatepickerModule, NbDialogModule, NbSelectModule, NbWindowModule} from "@nebular/theme";

@NgModule({
  declarations: [
    ParentProfileComponent,
    ProfileDetailsComponent,
    ChildDetailsComponent,
    ChildEditComponent],
  imports: [
    ThemeModule,
    ParentProfileRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbSelectModule,
    NbDatepickerModule,
  ],
  entryComponents: [
    ChildEditComponent
  ],
})
export class ParentProfileModule { }
