import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DIRECTIVES} from "./app.imports";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  declarations: [
    DIRECTIVES
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
    PipesModule
  ]
})

export class SharedModule {
}
