import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {LayoutService} from "./utils";
import {SmartTableData} from "./data/smart-table";
import {SmartTableService} from "./mock/smart-table.service";
import {UserInfoLocalStorage, UserInfoStorage, UserService} from "./data/users";
import {AppLoaderService} from "./utils/app-loader.service";
import {CanIProvider, SecurityModule} from "../security";
import {CustomCanIProvider} from "../auth/can.i.provider";

export function initApp(appLoaderService: AppLoaderService) {
  return () => appLoaderService.initApp();
}

const DATA_SERVICES = [
  UserService,
  {provide: SmartTableData, useClass: SmartTableService},
  {provide: UserInfoStorage, useClass: UserInfoLocalStorage},
  {provide: CanIProvider, useClass: CustomCanIProvider},
];

const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  LayoutService,
  // TODO: asset 5/19/19 uncomment {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoaderService], multi: true},
  // TODO: asset 5/19/19  AuthGuard
  // TODO: asset 5/19/19  {provide: HTTP_INTERCEPTORS, useClass: AuthSimpleInterceptor, multi: true},
  SecurityModule.forRoot()


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
