import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AppLoader, AuthInterceptor, MODULES, PROVIDERS, Settings} from "./app.imports";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

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
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    PROVIDERS,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoader], multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
