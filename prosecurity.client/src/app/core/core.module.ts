import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {LayoutService} from "./utils";
import {SmartTableData} from "./data/smart-table";
import {SmartTableService} from "./mock/smart-table.service";
import {UserInfoLocalStorage, UserInfoStorage, UserService} from "./data/users";
import {AppLoaderService} from "./utils/app-loader.service";
import {CanIProvider, SecurityModule} from "../security";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthSimpleInterceptor} from "./auth/auth-simple-interceptor";
import {AuthGuard} from "./auth/auth-guard.service";
import {CustomCanIProvider} from "./auth";
import {AuthService, TokenLocalStorage, TokenService, TokenStorage} from "./auth/services";

export function initApp(appLoaderService: AppLoaderService) {
  return () => appLoaderService.initApp();
}

const DATA_SERVICES = [
  UserService,
  AuthService,
  TokenService,
  {provide: SmartTableData, useClass: SmartTableService},
  {provide: UserInfoStorage, useClass: UserInfoLocalStorage},
  {provide: CanIProvider, useClass: CustomCanIProvider},
  {provide: TokenStorage, useClass: TokenLocalStorage},
];

const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  SecurityModule.forRoot().providers,
  LayoutService,
  AppLoaderService,
  AuthGuard,
  {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoaderService], multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthSimpleInterceptor, multi: true},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
