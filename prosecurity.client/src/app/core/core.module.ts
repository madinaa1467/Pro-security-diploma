import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {AppLoaderService, FileService, LayoutService, MessagingService} from "./utils";
import {SmartTableData} from "./data/smart-table";
import {SmartTableService} from "./mock/smart-table.service";
import {UserInfoLocalStorage, UserInfoStorage, UserService} from "./data/users";
import {CanIProvider, SecurityModule} from "../security";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthSimpleInterceptor} from "./auth/auth-simple-interceptor";
import {AuthGuard} from "./auth/auth-guard.service";
import {CustomCanIProvider} from "./auth";
import {AuthService, TokenLocalStorage, TokenService, TokenStorage} from "./auth/services";
import {SampleGuard} from "./guards";
import {UserActivityData, UserActivityService} from "./data/user-activity";
import {PeriodsService} from "./data/periods.service";
import {ModeratorService} from "./services/moderator.service";
import {ParentService} from "./services/parent.service";
import {UserGuard} from "./guards/user-guard.service";
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireModule} from '@angular/fire';
import {environment} from "../../environments/environment";

export function initApp(appLoaderService: AppLoaderService) {
  return () => appLoaderService.initApp();
}

const DATA_SERVICES = [
  UserService,
  AuthService,
  ModeratorService,
  TokenService,
  ParentService,
  {provide: SmartTableData, useClass: SmartTableService},
  {provide: UserInfoStorage, useClass: UserInfoLocalStorage},
  {provide: CanIProvider, useClass: CustomCanIProvider},
  {provide: TokenStorage, useClass: TokenLocalStorage},
  // TODO: msultanova 5/21/19 fake data should be removed
  {provide: UserActivityData, useClass: UserActivityService},
];

const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  SecurityModule.forRoot().providers,
  LayoutService,
  AppLoaderService,
  FileService,
  AuthGuard,
  MessagingService,

  SampleGuard,
  UserGuard,
  PeriodsService,

  {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoaderService], multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthSimpleInterceptor, multi: true},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
