import {NgModule} from '@angular/core';
import {DateFormatPipe} from './date-format';
import {SecurePipe} from './secure';


export const pipes = [
  DateFormatPipe,
  SecurePipe
];


@NgModule({
	declarations: [pipes],
	//imports: [],
	exports: [pipes]
})
export class PipesModule {}
