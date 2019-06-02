import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Options } from './options';
import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    Options,
  ],
  imports: [
    IonicPageModule.forChild(Options),
    SharedModule
  ],
  exports: [
    Options
  ]
})
export class OptionsModule {}
