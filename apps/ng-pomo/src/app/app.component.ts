import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  NEVER,
  Observable,
  Subscription,
} from 'rxjs';
import { scan, switchMap, takeWhile } from 'rxjs/operators';

type PomoStatus = 'flat' | 'pomo' | 'break';

const ONE_MINUTES = 60;

@Component({
  selector: 'ng-pomo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  timer$: Observable<number>;
  subscription: Subscription;
  interval = 1000;
  pomoMinutes = 0.1;
  pomoInterval = this.interval * ONE_MINUTES * this.pomoMinutes;
  remaininigMs = this.toMinutesAndSeconds(this.pomoInterval);
  interval$ = interval(this.interval);
  resumeToggle$ = new BehaviorSubject(false);
  pomoStatus: PomoStatus = 'flat';

  get resumable() {
    return this.resumeToggle$.value === false;
  }

  ngOnInit(): void {
    this.timer$ = this.resumeToggle$.pipe(
      switchMap((start) => (start ? this.interval$ : NEVER)),
      scan((remainingMs) => {
        return remainingMs - this.interval;
      }, this.pomoInterval),
      takeWhile((remainingMs) => {
        console.log(remainingMs);
        return remainingMs >= 0;
      })
    );
  }

  startAndPause(): void {
    this.resumeToggle$.next(!this.resumeToggle$.value);
    if (!this.subscription || this.subscription.closed) {
      this.subscription = this.timer$.subscribe({
        next: (val) => {
          this.remaininigMs = this.toMinutesAndSeconds(val);
        },
        complete: () => {
          this.remaininigMs = this.toMinutesAndSeconds(this.pomoInterval);
          this.resumeToggle$.next(false);
          this.pomoStatus = 'break';
        },
      });
    }
  }

  private toMinutesAndSeconds(ms: number): string {
    const minutes = Math.floor(ms / this.interval / 60);
    const seconds = String(Math.floor(ms / this.interval) % 60).padStart(
      2,
      '0'
    );
    return `${minutes}:${seconds}`;
  }
}
