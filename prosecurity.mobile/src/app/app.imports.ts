// Providers
import {
  AlertService,
  Api,
  AppLoader,
  Auth,
  DropdownService,
  FileProvider,
  ImagePickerProvider,
  NotificationProvider
} from "../providers";
// Modules
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
// Ionic native providers
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {ChildService} from "../providers/services/child.service";
import {ParentService} from "../providers/services/parent.service";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {Crop} from "@ionic-native/crop";
import {Push} from "@ionic-native/push";

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
  ParentService,
  FileProvider,
  ImagePickerProvider,
  NotificationProvider,

  // Ionic native specific providers
  StatusBar,
  SplashScreen,
  Camera,
  File,
  FilePath,
  Crop,
  Push

];

export const DIRECTIVES = [];
