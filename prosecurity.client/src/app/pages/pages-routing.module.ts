import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'history', pathMatch: 'full'},
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
      },
      {
        path: 'history',
        loadChildren: './history/history.module#HistoryModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
