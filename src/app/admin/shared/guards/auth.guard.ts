import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../../pages/login/auth.service';

@Injectable()
export class AuthGuard {
  private auth = inject(AuthService);
  private router = inject(Router);

  public canActivate():
    | Observable<boolean>
    | Promise<boolean>
    | boolean
    | undefined
    | void {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true,
        },
      });
    }
  }
}
