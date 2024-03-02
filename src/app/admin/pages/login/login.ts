import { FormControl } from '@angular/forms';

export interface ILoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
