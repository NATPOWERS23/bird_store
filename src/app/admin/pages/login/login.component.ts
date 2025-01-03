import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { map, tap } from 'rxjs/operators';

import { ILoginForm, IUser } from './login';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/state/admin/login/auth.actions';
import {
  selectErrValidation,
  selectStatus,
} from 'src/app/state/admin/login/login.reducer';
import { HandleErrorsPipe } from '@core/pipes/handle-errors.pipe';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, HandleErrorsPipe]
})
export class LoginComponent implements OnInit {
  public form!: FormGroup<ILoginForm>;
  public message = '';

  public store = inject(Store);
  public status$ = this.store.select(selectStatus);
  public errors$ = this.store.select(selectErrValidation);

  private router = inject(Router);
  private route$ = inject(ActivatedRoute).queryParams;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getRouteState();
    this.createLoginForm();
    this.navigateOnSuccessLogin();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    } as IUser;

    this.store.dispatch(authActions.loginUser({ user }));
  }

  private getRouteState(): void {
    this.route$
      .pipe(
        map((params: Params) => {
          this.message = params['loginAgain']
            ? 'Будь ласака, внесіть дані'
            : params['authFailed']
            ? 'Сесія закінчилась. Веддіть дані повторно'
            : '';
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private createLoginForm(): void {
    this.form = new FormGroup<ILoginForm>({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  private navigateOnSuccessLogin(): void {
    this.status$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(status => {
          if (status === 'success') {
            this.router.navigate(['/admin', 'dashboard']);
          }
        })
      )
      .subscribe();
  }
}
