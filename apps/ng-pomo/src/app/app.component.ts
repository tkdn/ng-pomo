import { Component } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  NEVER,
  Observable,
  Subscription,
} from 'rxjs';
import { scan, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  remainingMs$: Observable<number>;
  subscription: Subscription;
  interval = 1000;
  pomoInterval = 5000; // 1000 * 60 * 25;
  toggle$ = new BehaviorSubject(true);

  start(): void {
    this.remainingMs$ = this.toggle$.pipe(
      switchMap((resume) => {
        return resume ? interval(this.interval) : NEVER;
      }),
      scan((acc) => {
        return acc - this.interval;
      }, this.pomoInterval),
      takeWhile((time) => {
        console.log('RemainingMs:', time);
        return time >= 0;
      })
    );
  }

  stop(): void {
    this.toggle$.next(!this.toggle$.value);
    console.log(this.toggle$);
  }

  toMinutesAndSeconds(ms: number): string {
    const minutes = Math.floor(ms / this.interval / 60);
    const seconds = String(Math.floor(ms / this.interval) % 60).padStart(
      2,
      '0'
    );
    return `${minutes}:${seconds}`;
  }
}
