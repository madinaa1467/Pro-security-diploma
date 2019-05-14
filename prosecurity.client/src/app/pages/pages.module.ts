import {NgModule} from '@angular/core';

import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from "../theme/theme.module";
import {PagesComponent} from './pages.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  declarations: [...PAGES_COMPONENTS],
  imports: [
    PagesRoutingModule,
    ThemeModule
  ]
})
export class PagesModule {}
