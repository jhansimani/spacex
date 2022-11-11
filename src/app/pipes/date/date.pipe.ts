import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    console.log(value);
    return value;
  }
}
