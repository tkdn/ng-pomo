import { Pipe, PipeTransform } from '@angular/core';

const INTERVAL = 1000;

@Pipe({ name: 'pomoMinutesAndSeconds' })
export class PomoMinutesAndSeconds implements PipeTransform {
  transform(ms: number) {
    const minutes = Math.floor(ms / INTERVAL / 60);
    const seconds = String(Math.floor(ms / INTERVAL) % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
