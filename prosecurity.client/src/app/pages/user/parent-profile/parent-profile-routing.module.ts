import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParentProfileComponent} from "./parent-profile.component";

const routes: Routes = [{
  path: '', component: ParentProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentProfileRoutingModule { }
