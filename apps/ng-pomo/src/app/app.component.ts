import { Component } from '@angular/core';
import { BehaviorSubject, interval, NEVER, Observable } from 'rxjs';
import { map, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timer$: Observable<string>;
  interval = 1000;
  pomoInterval = 3000; // 1000 * 60 * 25;
  interval$ = interval(this.interval);
  toggle$ = new BehaviorSubject(true);

  get resumable() {
    return this.toggle$.value === false;
  }

  start(): void {
    this.timer$ = this.toggle$.pipe(
      switchMap((start) => (start ? this.interval$ : NEVER)),
      map((count) => {
        return this.pomoInterval - this.interval * (count + 1);
      }),
      takeWhile((remainingMs) => {
        console.log(remainingMs);
        return remainingMs >= 0;
      }),
      map((remainingMs) => this.toMinutesAndSeconds(remainingMs))
    );
  }

  toggle(): void {
    this.toggle$.next(!this.toggle$.value);
  }

  toMinutesAndSeconds(ms: number): string {
    const minutes = Math.floor(ms / this.interval / 60);
    const seconds = String(Math.floor(ms / this.interval) % 60).padStart(
      2,
      '0'
    );
    return `${minutes}:${seconds}`;
  }

  debug() {
    console.log(this.timer$);
  }
}
