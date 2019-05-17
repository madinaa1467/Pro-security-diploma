import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {IonicStorageModule, Storage} from "@ionic/storage";
import {AppLoader, AuthInterceptor, MODULES, PROVIDERS, Settings} from "./app.imports";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {Home} from '../pages/home/home';
import {PostPopover} from '../pages/home/post-popover';
import {Search} from '../pages/search/search';
import {ModalPost} from '../pages/modal-post/modal-post';
import {NewMessage} from '../pages/new-message/new-message';
import {Notifications} from '../pages/notifications/notifications';
import {TaggedProfile} from '../pages/tagged-profile/tagged-profile';
import {SavedProfile} from '../pages/saved-profile/saved-profile';
import {Options} from '../pages/options/options';
import {Comments} from '../pages/comments/comments';
import {TabsPage} from '../pages/tabs/tabs';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import IonicStepperModule from "ionic-stepper";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set create default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

export function initApp(appLoadService: AppLoader) {
  return () => appLoadService.initApp();
}

export function setTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');//, './assets/i18n/', '.json'
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    // App Core
    MyApp,
    Home,
    PostPopover,
    Search,
    ModalPost,
    NewMessage,
    Notifications,
    // Profile,
    TaggedProfile,
    SavedProfile,
    Options,
    Comments,
    TabsPage
  ],
  imports: [
    BrowserModule,
    MODULES,
    IonicStepperModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    PostPopover,
    Search,
    ModalPost,
    NewMessage,
    Notifications,
    // Profile,
    TaggedProfile,
    SavedProfile,
    Options,
    Comments,
    TabsPage
  ],
  providers: [
    PROVIDERS,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoader], multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  ]
})

// providers: [
//   PROVIDERS,
//   {provide: Settings, useFactory: provideSettings, deps: [Storage]},
//   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
//   {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoader], multi: true},
//   {provide: ErrorHandler, useClass: IonicErrorHandler},
// ]
export class AppModule {
}
