import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, status = 'ok'): any {
    const timeStamp = new Date(value);
    let dayFlag = JSON.stringify(timeStamp.getDate());
    let day = dayFlag;
    if (day.length == 1) {
      day = '0' + day;
    }
    const month = timeStamp.getMonth();
    var monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;
    var longName = monthName(timeStamp);

    let hoursFlag = JSON.stringify(timeStamp.getHours());
    let hours = hoursFlag;
    if (hours.length == 1) {
      hours = '0' + hours;
    }
    let minutes = JSON.stringify(timeStamp.getMinutes());
    if (minutes.length == 1) {
      minutes = minutes + '0';
    }
    const year = timeStamp.getFullYear();
    // const hours = timeStamp.getHours();
    // const minutes = timeStamp.getMinutes();
    if (status == 'fail') {
      return `${day} ${longName} ${year} at ${hours}:${minutes} `;
    }
    return `${day} ${longName} ${year} ${hours}:${minutes} `;
    return value;
  }
}
