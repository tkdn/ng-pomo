import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

const ONE_MINUTES = 60;
const INTERVAL = 1000;
const POMO_MINUTES = 25;
const POMO_INTTERVAL = INTERVAL * ONE_MINUTES * POMO_MINUTES;

type TimerState = {
  resumable: boolean;
  duration: number;
  remainingMs: number;
  interval: number;
  percentage: number;
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private initialState: TimerState = {
    resumable: false,
    duration: POMO_INTTERVAL,
    remainingMs: POMO_INTTERVAL,
    interval: INTERVAL,
    percentage: 100,
  };
  private _minutes = 25;
  state$: BehaviorSubject<TimerState>;
  completed: EventEmitter<boolean>;

  set minutes(val: number) {
    this._minutes = val;
    this.state$.next({
      ...this.state$.value,
      duration: INTERVAL * ONE_MINUTES * val,
      remainingMs: INTERVAL * ONE_MINUTES * val,
    });
  }

  get state() {
    return this.state$.value;
  }

  get percentage() {
    const ratio = this.state$.value.remainingMs / this.state$.value.duration;
    return Math.floor(100 * ratio * 100) / 100;
  }

  constructor() {
    this.initialState = {
      ...this.initialState,
      duration: INTERVAL * ONE_MINUTES * this._minutes,
      remainingMs: INTERVAL * ONE_MINUTES * this._minutes,
    };
    this.state$ = new BehaviorSubject<TimerState>(this.initialState);
    this.state$
      .pipe(
        scan((state: TimerState, curr) => {
          return { ...state, ...curr };
        }, this.initialState),
        switchMap((state) =>
          state.resumable
            ? interval(INTERVAL).pipe(
                map(() => {
                  this.next();
                  if (this.state$.value.remainingMs <= 0) {
                    this.stop();
                  }
                  return this.state$.value;
                })
              )
            : NEVER
        ),
        map((val) => val)
      )
      .subscribe();
  }

  startOrPause(): void {
    this.state$.next({
      ...this.state$.value,
      ...{ resumable: !this.state$.value.resumable },
    });
  }

  next(): void {
    const { value } = this.state$;
    const remainingMs = value.remainingMs - INTERVAL;
    const percentage =
      Math.floor(100 * (remainingMs / value.duration) * 100) / 100;
    this.state$.next({
      ...value,
      remainingMs,
      percentage,
    });
  }

  stop(): void {
    this.completed.emit(true);
    this.state$.next({
      ...this.state$.value,
      remainingMs: INTERVAL * ONE_MINUTES * this._minutes,
      resumable: false,
      percentage: 0,
    });
  }
}
