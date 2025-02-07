import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from './user-state.interface';
import { authActions } from './auth.actions';
import { StateStatus } from '../../app.state';

export const initialUserState: UserState = {
  user: undefined,
  errValidation: null,
  status: '',
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialUserState,
    on(authActions.loginUser, (state: UserState) => {
      return {
        ...state,
        errValidation: null,
        status: 'loading' as StateStatus,
      };
    }),

    on(authActions.loginUserSuccess, (state: UserState, action) => {
      return {
        ...state,
        user: action.user,
        errValidation: null,
        status: 'success' as StateStatus,
      };
    }),

    on(authActions.loginUserFailure, (state: UserState, action) => {
      return {
        ...state,
        errValidation: action.errors,
        status: 'error' as StateStatus,
      };
    })
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectUser,
  selectErrValidation,
  selectStatus,
} = authFeature;
