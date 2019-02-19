import {Pipe} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe extends DatePipe {
  readonly defaultFormat: string = 'dd/MM/yyyy HH:mm';

  transform(value: any, format?: any) {
    format = format ? format : this.defaultFormat;//default value

    return super.transform(value, format);
  }
}
