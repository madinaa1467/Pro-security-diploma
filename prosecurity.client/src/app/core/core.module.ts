import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {LayoutService} from "./utils";
import {SmartTableData} from "./data/smart-table";
import {SmartTableService} from "./mock/smart-table.service";

const DATA_SERVICES = [
  {provide: SmartTableData, useClass: SmartTableService},
];

const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  LayoutService
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
