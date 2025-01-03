import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { fbAuthResponse } from './auth-service';
import { FbAuthResponse, IUser } from './login';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return <string>localStorage.getItem('fb-token');
  }

  public login(user: IUser): Observable<FbAuthResponse> {
    return this.http
      .post<FbAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        { ...user, returnSecureToken: true }
      )
      .pipe(
        tap(res => this.setToken(res as fbAuthResponse)),
        catchError((error: HttpErrorResponse) => throwError({ errors: error }))
      );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: fbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear()
    }
  }
}
