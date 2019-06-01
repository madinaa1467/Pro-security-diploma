import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user.component";

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'profile',
    loadChildren: './parent-profile/parent-profile.module#ParentProfileModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
