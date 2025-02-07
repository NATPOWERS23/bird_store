import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  selectGroupedCartEntries,
  selectTotalPrice,
} from '../../state/cart/cart.selectors';
import {
  addProduct,
  clearCart,
  loadCart,
  removeAllEntriesOfProduct,
  removeProduct,
} from '../../state/cart/cart.actions';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';
import { DialogComponent } from '@core/components/modals/dialog.component';
import {
  IProduct,
  IProductGroup,
} from '../products-page/types/product-interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [ButtonComponent, MatCardModule, RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public store = inject(Store);

  public cartEntries = toSignal(this.store.select(selectGroupedCartEntries));
  public countCart = toSignal(this.store.select(selectTotalPrice));
  public ButtonSize: typeof ButtonSize = ButtonSize;

  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  ngOnInit(): void {
    this.store.dispatch(loadCart());
  }

  public removeProduct(product: IProduct): void {
    this.store.dispatch(removeAllEntriesOfProduct(product));
  }

  public clearCart(): void {
    this.store.dispatch(clearCart());
  }

  public oneMore(entry: IProductGroup): void {
    this.store.dispatch(addProduct({ product: entry.product, quantity: '1' }));
  }

  public oneLess(entry: IProductGroup): void {
    this.store.dispatch(removeProduct(entry.product));
  }

  public openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '250px',
        data: { title: 'Make an Order' },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public toPayment(): void {
    this.router.navigate(['/payment']);
  }
}
