import { createSelector } from '@ngrx/store';
import { UserState } from './user-state.interface';

export const selectFeature = (state: { user: UserState }) => state.user;

export const selectUser = createSelector(
  selectFeature,
  (state: UserState) => state
);
