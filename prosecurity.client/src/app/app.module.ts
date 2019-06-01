import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeModule} from "./theme/theme.module";
import {CoreModule} from "./core/core.module";
import {HttpModule} from "./http";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


// import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    InfiniteScrollModule,

    // MatSlideToggleModule
    // MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
