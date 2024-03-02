import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/admin/pages/login/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    req = req.clone({
      setParams: {
        auth: auth.token as string,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Interceptor Error: ', error);
      if (error.status === 401) {
        auth.logout();
        router.navigate(['/admin', 'login'], {
          queryParams: {
            authFailed: true,
          },
        });
      }
      return throwError(error);
    })
  );
};
