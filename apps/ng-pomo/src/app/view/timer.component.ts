import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

const ONE_MINUTES = 60;
const INTERVAL = 1000;
const POMO_MINUTES = 25;
const POMO_INTTERVAL = INTERVAL * ONE_MINUTES * POMO_MINUTES;

type PomoState = {
  resumable: boolean;
  focusInterval: number;
  remainingMs: number;
  interval: number;
};

@Component({
  selector: 'ng-pomo-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input()
  active: boolean;
  @Input()
  minutes: number;
  @Output()
  completed = new EventEmitter<boolean>();

  initialState: PomoState = {
    resumable: false,
    focusInterval: POMO_INTTERVAL,
    remainingMs: POMO_INTTERVAL,
    interval: INTERVAL,
  };
  state$: BehaviorSubject<PomoState>;

  ngOnInit(): void {
    this.initialState = {
      ...this.initialState,
      focusInterval: INTERVAL * ONE_MINUTES * this.minutes,
      remainingMs: INTERVAL * ONE_MINUTES * this.minutes,
    };
    this.state$ = new BehaviorSubject<PomoState>(this.initialState);
    this.state$
      .pipe(
        scan((state: PomoState, curr) => {
          return { ...state, ...curr };
        }, this.initialState),
        switchMap((state) =>
          state.resumable
            ? interval(INTERVAL).pipe(
                map(() => {
                  this.next(state);
                  if (this.state$.value.remainingMs <= 0) {
                    this.stop(state);
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

  next(currentState: PomoState): void {
    this.state$.next({
      ...currentState,
      ...{ remainingMs: currentState.remainingMs - INTERVAL },
    });
  }

  stop(currentState: PomoState): void {
    this.completed.emit(true);
    this.state$.next({
      ...currentState,
      ...{
        remainingMs: INTERVAL * ONE_MINUTES * this.minutes,
        resumable: false,
      },
    });
  }

  reset(): void {
    this.state$.next(this.initialState);
  }

  debug() {
    console.log(this.state$.value);
  }
}
