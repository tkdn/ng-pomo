import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pomoMinutesAndSeconds' })
export class PomoMinutesAndSeconds implements PipeTransform {
  transform(ms: number) {
    const date = new Date(ms);
    const minutes = date.getMinutes();
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
