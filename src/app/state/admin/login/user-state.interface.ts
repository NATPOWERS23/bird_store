import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FbAuthResponse, IUser } from 'src/app/admin/pages/login/login';

export interface UserState {
  user: IUser | FbAuthResponse | null | undefined;
  errValidation: HttpErrorResponse | null;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
