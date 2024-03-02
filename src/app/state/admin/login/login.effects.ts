import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/admin/pages/login/auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { FbAuthResponse } from 'src/app/admin/pages/login/login';

export const LoginEffects = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.loginUser),
      switchMap(({ user }) => {
        return authService.login(user).pipe(
          map((currentUser: FbAuthResponse) => {
            return authActions.loginUserSuccess({ user: currentUser });
          }),
          catchError(err => of(authActions.loginUserFailure(err)))
        );
      })
    );
  },
  { functional: true }
);
