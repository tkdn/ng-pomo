import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  NEVER,
  Observable,
  Subscription,
} from 'rxjs';
import { scan, startWith, switchMap, takeWhile } from 'rxjs/operators';

type PomoStatus = 'flat' | 'pomo' | 'break';
const ONE_MINUTES = 60;
const INTERVAL = 1000;

@Component({
  selector: 'ng-pomo-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css'],
})
export class FocusComponent implements OnInit {
  timer$: Observable<number>;
  subscription: Subscription;
  pomoMinutes = 0.1;
  pomoInterval = INTERVAL * ONE_MINUTES * this.pomoMinutes;
  pomoInitial = this.pomoInterval + INTERVAL;
  time = this.pomoInterval;
  interval$ = interval(INTERVAL);
  resumeToggle$ = new BehaviorSubject(false);
  pomoStatus: PomoStatus = 'flat';

  get resumable() {
    return this.resumeToggle$.value === false;
  }

  ngOnInit(): void {
    this.timer$ = this.resumeToggle$.pipe(
      switchMap((start) => (start ? this.interval$ : NEVER)),
      startWith(this.pomoInitial),
      scan((remainingMs) => {
        return remainingMs - INTERVAL;
      }, this.pomoInitial),
      takeWhile((remainingMs) => {
        return remainingMs >= INTERVAL;
      })
    );
    this.subscription = this.timer$.subscribe({
      complete: () => {
        this.resumeToggle$.next(false);
        this.pomoStatus = 'break';
      },
    });
  }

  startAndPause(): void {
    this.resumeToggle$.next(!this.resumeToggle$.value);
    this.pomoStatus = 'pomo';
  }
}
