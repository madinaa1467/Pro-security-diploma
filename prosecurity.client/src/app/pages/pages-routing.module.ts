import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {SampleGuard} from '../core/guards/sample-guard.service';
import {AuthGuard} from "../core/auth";
import {UserGuard} from "../core/guards/user-guard.service";

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
      {
        path: 'sample',
        canActivate: [SampleGuard],
        loadChildren: './sample/sample.module#SampleModule',
      },
      {
        path: 'moderator',
        loadChildren: './moderator/moderator.module#ModeratorModule',
      },
      {
        canActivate: [UserGuard],
        path: 'user',
        loadChildren: './user/user.module#UserModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
