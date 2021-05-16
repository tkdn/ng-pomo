import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { StoreState } from '../rootReducer';

type TimerState = {
  side: 'pomo' | 'break';
  pause: boolean;
  offset: number;
  time: number;
  duration: {
    [side in TimerState['side']]: number;
  };
  pomos: number;
};

const ONE_MINUTES = 60;
const INTERVAL = 1000;
const POMO_INTERVAL = INTERVAL * ONE_MINUTES * 25;
const BREAK_INIERVAL = INTERVAL * ONE_MINUTES * 5;

export const timerInit = createAction(
  'Timer/Init',
  props<
    {
      [side in TimerState['side']]: number;
    }
  >()
);

export const timerStart = createAction(
  'Timer/Start',
  props<{ offset: number }>()
);
export const timerTick = createAction('Timer/Tick', props<{ now: number }>());
export const timerPause = createAction('Timer/Pause');
export const timerStop = createAction('Timer/Stop');
export const timerCountup = createAction('Timer/Countup');

const initialState: TimerState = {
  side: 'pomo',
  pause: true,
  offset: 0,
  time: 0,
  duration: {
    pomo: POMO_INTERVAL,
    break: BREAK_INIERVAL,
  },
  pomos: 0,
};

const reducer = createReducer(
  initialState,
  on(timerInit, (state, action) => ({
    ...state,
    time: action.pomo,
    duration: { pomo: action.pomo, break: action.break },
  })),
  on(timerStart, (state, action) => ({
    ...state,
    pause: false,
    offset: action.offset,
  })),
  on(timerTick, (state, action) => {
    return {
      ...state,
      time: state.duration[state.side] - (action.now - state.offset),
    };
  }),
  on(timerPause, (state) => ({
    ...state,
    pause: true,
  })),
  on(timerStop, (state) => {
    const side = state.side === 'pomo' ? 'break' : 'pomo';
    return {
      ...state,
      time: state.duration[side],
      offset: 0,
      pause: true,
      side,
    };
  }),
  on(timerCountup, (state) => ({
    ...state,
    pomos: state.pomos + 1,
  }))
);

const selectTimer = (state: StoreState) => state.timer;

export const percentage = createSelector(selectTimer, (state) => {
  const ratio = state.time / state.duration[state.side];
  return Math.floor(100 * ratio * 100) / 100;
});

export function timer(state, action) {
  return reducer(state, action);
}
