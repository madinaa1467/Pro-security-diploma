import {NgModule} from '@angular/core';

import {ParentProfileRoutingModule} from './parent-profile-routing.module';
import {ParentProfileComponent} from "./parent-profile.component";
import {ThemeModule} from "../../../theme/theme.module";
import {ProfileDetailsComponent} from './profile-details/profile-details.component';
import {ChildDetailsComponent} from './child-details/child-details.component';
import {ChildEditComponent} from './child-details/child-edit/child-edit.component';
import {NbDatepickerModule, NbDialogModule, NbSelectModule, NbWindowModule} from "@nebular/theme";
import {ChildSaveComponent} from "./child-details/child-save/child-save.component";
import {NgxMaskModule} from "ngx-mask";
import { EditProfileComponent } from './profile-details/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    ParentProfileComponent,
    ProfileDetailsComponent,
    ChildDetailsComponent,
    ChildEditComponent,
    ChildSaveComponent,
    EditProfileComponent
  ],
  imports: [
    ThemeModule,
    ParentProfileRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbSelectModule,
    NbDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  entryComponents: [
    ChildEditComponent,
    ChildSaveComponent,
    EditProfileComponent
  ],
})
export class ParentProfileModule { }
