import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services";

const MODULES = [];
const PROVIDERS = [HttpService];


@NgModule({
  imports: [HttpClientModule, CommonModule],
  exports: [],
  providers: [...PROVIDERS]

})
export class HttpModule {}
