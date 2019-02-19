import {NgModule} from '@angular/core';
import {DateFormatPipe} from './date-format';


export const pipes = [
  DateFormatPipe
];


@NgModule({
	declarations: [pipes],
	//imports: [],
	exports: [pipes]
})
export class PipesModule {}
