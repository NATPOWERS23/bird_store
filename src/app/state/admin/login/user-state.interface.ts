import { HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, IUser } from 'src/app/admin/pages/login/login';
import { StateStatus } from '../../app.state';

export interface UserState {
  user: IUser | FbAuthResponse | null | undefined;
  errValidation: HttpErrorResponse | null;
  status: StateStatus;
}
