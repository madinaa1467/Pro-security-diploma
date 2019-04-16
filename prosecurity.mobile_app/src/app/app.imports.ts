// Providers
import {AlertService, Api, AppLoader, Auth, DropdownService} from "../providers";
// Modules
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
// Ionic native providers
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {ChildService} from "../providers/services/child.service";

// Directives


export {AuthInterceptor, Settings, AppLoader} from "../providers";

export const MODULES = [
  BrowserModule,
  HttpClientModule,
];

export const PROVIDERS = [
  Api,
  Auth,
  AppLoader,
  AlertService,
  DropdownService,
  ChildService,

  // Ionic native specific providers
  StatusBar,
  SplashScreen,
];

export const DIRECTIVES = [];
