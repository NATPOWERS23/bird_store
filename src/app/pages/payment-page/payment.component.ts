import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonSize } from '@shared/components/button/button';
import { MaterialModule } from '@shared/material/material.module';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { PaypalComponent } from './paypal/paypal.component';
import { Store } from '@ngrx/store';
import { selectTotalPrice } from 'src/app/state/cart/cart.selectors';
import { RouterLink } from '@angular/router';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  public store = inject(Store);
  public countCart$ = this.store.select(selectTotalPrice);
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
