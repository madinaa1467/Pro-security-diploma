import {NgModule, ErrorHandler, APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {IonicStorageModule, Storage} from "@ionic/storage";
import {AppLoader, AuthInterceptor, MODULES, PROVIDERS, Settings} from "./app.imports";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { Home } from '../pages/home/home';
import { PostPopover } from '../pages/home/post-popover';
import { Search } from '../pages/search/search';
import { ModalPost } from '../pages/modal-post/modal-post';
import { Messages } from '../pages/messages/messages';
import { MessageDetail } from '../pages/message-detail/message-detail';
import { NewMessage } from '../pages/new-message/new-message';
import { Notifications } from '../pages/notifications/notifications';
import { Profile } from '../pages/profile/profile';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { TaggedProfile } from '../pages/tagged-profile/tagged-profile';
import { SavedProfile } from '../pages/saved-profile/saved-profile';
import { Options } from '../pages/options/options';
import { Comments } from '../pages/comments/comments';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
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

@NgModule({
  declarations: [
    // App Core
    MyApp,
    Home,
    PostPopover,
    Search,
    ModalPost,
    Messages,
    MessageDetail,
    NewMessage,
    Notifications,
    Profile,
    EditProfile,
    TaggedProfile,
    SavedProfile,
    Options,
    Comments,
    TabsPage
  ],
  imports: [
    MODULES,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    PostPopover,
    Search,
    ModalPost,
    Messages,
    MessageDetail,
    NewMessage,
    Notifications,
    Profile,
    EditProfile,
    TaggedProfile,
    SavedProfile,
    Options,
    Comments,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PROVIDERS,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoader], multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
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