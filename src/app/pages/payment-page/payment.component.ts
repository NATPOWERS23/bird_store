import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { MaterialModule } from '@core/material/material.module';
import { PaypalComponent } from './paypal/paypal.component';
import { selectTotalPrice } from 'src/app/state/cart/cart.selectors';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';
import { PageTitleComponent } from '@core/components/page-title/page-title.component';

@Component({
    selector: 'app-payment-page',
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent {
  public store = inject(Store);
  public countCart$ = this.store.select(selectTotalPrice);
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
