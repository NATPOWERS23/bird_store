import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { ButtonSize } from '@shared/components/button/button';
import { MaterialModule } from '@core/material/material.module';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { PaypalComponent } from './paypal/paypal.component';
import { selectTotalPrice } from 'src/app/state/cart/cart.selectors';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [
    MaterialModule,
    ButtonComponent,
    PageTitleComponent,
    PaypalComponent,
    RouterLink,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  public store = inject(Store);
  public countCart$ = this.store.select(selectTotalPrice);
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
