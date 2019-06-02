import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DIRECTIVES} from "./app.imports";
import {PipesModule} from "../pipes/pipes.module";
import {TranslateModule} from '@ngx-translate/core';
import Directive from "ionic3-input-mask";

@NgModule({
  declarations: [
    DIRECTIVES,
    Directive
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule,
    TranslateModule
  ],
  exports: [
    ComponentsModule,
    PipesModule,
    TranslateModule,
    Directive
  ]
})

export class SharedModule {
}
