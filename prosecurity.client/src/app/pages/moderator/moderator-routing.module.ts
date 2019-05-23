import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModeratorComponent} from './moderator.component';

const routes: Routes = [{
  path: '', component: ModeratorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
