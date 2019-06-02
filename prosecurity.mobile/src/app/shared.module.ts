import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DIRECTIVES} from "./app.imports";
import {PipesModule} from "../pipes/pipes.module";
import {TranslateModule} from '@ngx-translate/core';
import Directive from "ionic3-input-mask";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DIRECTIVES,
    Directive
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
  ],
  exports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    TranslateModule,
    Directive
  ]
})

export class SharedModule {
}
