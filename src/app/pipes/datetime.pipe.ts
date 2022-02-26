import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'DateTime',
})
export class DateTime implements PipeTransform {
  transform(value: Date, format: string): string {
    if (!value) throw new Error("the date value can't be null or undefined");

    if (!format || format == '')
      throw new Error('Date format is null,undefined or empty string');

    return moment(value).format(format);
  }
}
