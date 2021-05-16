import { timer } from './timer';

export const rootReducer = { timer };

export type StoreState = {
  timer: ReturnType<typeof timer>;
};
