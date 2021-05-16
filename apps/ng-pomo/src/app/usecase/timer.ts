import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StoreState } from '../store/rootReducer';
import {
  percentage,
  timerCountup,
  timerInit,
  timerPause,
  timerStart,
  timerStop,
  timerTick,
} from '../store/timer';

@Injectable({
  providedIn: 'root',
})
export class TimerUsecase {
  timer$ = this.store.select('timer');
  timerState: StoreState['timer'];
  percentage$ = this.store.select(percentage);

  interval: number;
  pauseInterval: number;

  pause = 0;
  pauseOffset = 0;

  constructor(private store: Store<StoreState>) {
    this.store.dispatch(
      timerInit({
        pomo: 1000 * 60 * 0.1,
        break: 1000 * 60 * 0.1,
      })
    );
  }

  get timer() {
    this.store.pipe(take(1)).subscribe((state) => {
      this.timerState = state.timer;
    });
    return this.timerState;
  }

  start() {
    const now = Date.now();
    if (this.timer.pause) {
      const offset =
        this.timer.offset === 0 ? now : this.timer.offset + this.pause;
      this.store.dispatch(timerStart({ offset }));
      this.interval = requestAnimationFrame(this.tick);
      cancelAnimationFrame(this.pauseInterval);
    } else {
      this.pauseOffset = now;
      this.store.dispatch(timerPause());
      cancelAnimationFrame(this.interval);
      this.pauseInterval = requestAnimationFrame(this.pauseTick);
    }
  }

  tick = () => {
    if (this.timer.time < 1000) {
      this.stop();
    } else {
      this.store.dispatch(timerTick({ now: Date.now() }));
      this.interval = requestAnimationFrame(this.tick);
    }
  };

  pauseTick = () => {
    this.pause = Date.now() - this.pauseOffset;
    this.pauseInterval = requestAnimationFrame(this.pauseTick);
  };

  stop() {
    cancelAnimationFrame(this.interval);
    if (this.timer.side === 'pomo') {
      this.store.dispatch(timerCountup());
    }
    this.store.dispatch(timerStop());
  }
}
