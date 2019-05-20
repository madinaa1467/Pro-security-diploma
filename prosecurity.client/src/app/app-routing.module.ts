import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/auth";

const routes: Routes = [
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
