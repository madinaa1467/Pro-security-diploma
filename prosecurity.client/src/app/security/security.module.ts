import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanIDirective} from "./directives/can.i.directive";
import {CanIChecker} from "./services/can.i.checker";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CanIDirective,
  ],
  exports: [
    CanIDirective,
  ],
})
export class SecurityModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SecurityModule,
      providers: [
        CanIChecker
      ],
      exports: [
        CanIDirective,
      ],
    };
  }
}
