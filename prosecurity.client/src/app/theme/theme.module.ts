import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSidebarModule, NbSpinnerModule,
  NbStepperModule,
  NbThemeModule,
  NbUserModule
} from "@nebular/theme";
import {CORPORATE_THEME} from "./styles/theme.corporate";
import {PageLayoutComponent} from "./layouts";
import {FooterComponent, HeaderComponent, RecentEventComponent, ToggleSettingsButtonComponent} from "./components";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SecurityModule} from "../security";
import {SecurePipe} from './pipes/secure.pipe';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  SecurityModule,

  Ng2SmartTableModule,

  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbStepperModule,
  NbBadgeModule,
  NbListModule,
  NbDialogModule,
  NgbModule

];

const COMPONENTS = [PageLayoutComponent, HeaderComponent, FooterComponent, ToggleSettingsButtonComponent, RecentEventComponent];

const ENTRY_COMPONENTS = [];

const PIPES = [SecurePipe];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'corporate',
    },
    [CORPORATE_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, NbSpinnerModule, InfiniteScrollModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
