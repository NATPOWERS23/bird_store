import { createActionGroup, props } from '@ngrx/store';
import { FbAuthResponse, IUser } from 'src/app/admin/pages/login/login';
import { HttpErrorResponse } from '@angular/common/http';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    'Login User': props<{ user: IUser }>(),
    'Login User Success': props<{ user: FbAuthResponse }>(),
    'Login User Failure': props<{ errors: HttpErrorResponse }>(),
  },
});
