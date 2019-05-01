import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DIRECTIVES} from "./app.imports";
import {PipesModule} from "../pipes/pipes.module";
import {TranslateModule} from '@ngx-translate/core';
import {DirectivesModule} from "../directives/directives.module";

@NgModule({
  declarations: [
    DIRECTIVES
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    ComponentsModule,
    PipesModule,
    TranslateModule,
    DirectivesModule
  ]
})

export class SharedModule {
}
