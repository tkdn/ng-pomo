import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';

const ONE_MINUTES = 60;
const INTERVAL = 1000;
const POMO_MINUTES = 0.1;

type PomoState = {
  resumable: boolean;
  disable: boolean;
  focusInterval: number;
  remainingMs: number;
  interval: number;
};
const initialState: PomoState = {
  resumable: false,
  disable: false,
  focusInterval: INTERVAL * ONE_MINUTES * POMO_MINUTES,
  remainingMs: INTERVAL * ONE_MINUTES * POMO_MINUTES,
  interval: INTERVAL,
};

@Component({
  selector: 'ng-pomo-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css'],
})
export class FocusComponent implements OnInit {
  state$ = new BehaviorSubject<PomoState>(initialState);

  ngOnInit(): void {
    this.state$
      .pipe(
        scan((state: PomoState, curr) => {
          return { ...state, ...curr };
        }, initialState),
        switchMap((state) =>
          state.resumable
            ? interval(INTERVAL).pipe(
                map(() => {
                  this.next(state);
                  if (this.state$.value.remainingMs <= 0) {
                    this.stop(state);
                  }
                  console.log(this.state$.value);
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
    this.state$.next({
      ...currentState,
      ...{
        remainingMs: INTERVAL * ONE_MINUTES * POMO_MINUTES,
        disable: true,
        resumable: false,
      },
    });
  }

  reset(): void {
    this.state$.next(initialState);
  }
}
