import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from './user-state.interface';
import { authActions } from './auth.actions';
import { FbAuthResponse, IUser } from 'src/app/admin/pages/login/login';
import { TypedAction } from '@ngrx/store/src/models';

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
        status: 'loading',
      };
    }),

    on(authActions.loginUserSuccess, (state: UserState, action) => {
      return {
        ...state,
        user: action.user,
        errValidation: null,
        status: 'success',
      };
    }),

    on(authActions.loginUserFailure, (state: UserState, action) => {
      return {
        ...state,
        errValidation: action.errors,
        status: 'error',
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
