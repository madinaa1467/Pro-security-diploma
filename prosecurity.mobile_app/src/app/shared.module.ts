import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DIRECTIVES} from "./app.imports";
import {PipesModule} from "../pipes/pipes.module";
import {TranslateModule} from '@ngx-translate/core';

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
    PipesModule,
    TranslateModule,
  ]
})

export class SharedModule {
}
