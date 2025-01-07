import { Component, Input, OnInit, inject } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

import { Store } from '@ngrx/store';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  addProduct,
  removeAllEntriesOfProduct,
} from '../../../state/cart/cart.actions';
import { MaterialModule } from '@core/material/material.module';
import { ButtonCheckboxComponent } from '@core/components/button-checkbox/button-checkbox.component';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';
import {
  IItemForm,
  IProduct,
  IProductGroup,
} from '../types/product-interfaces';
import { FavoritesService } from '../../../features/favorites/favorites.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [
    MaterialModule,
    NgClass,
    RouterLink,
    NgStyle,
    ReactiveFormsModule,
    ButtonComponent,
    ButtonCheckboxComponent,
    CurrencyPipe,
    NgIf,
    MatBadgeModule,
  ],
})
export class ItemComponent implements OnInit {
  @Input() public product!: IProduct;
  @Input() public value = 5;
  @Input() public addedToCart: null | IProductGroup[] = [];

  public quantityForm!: FormGroup<IItemForm>;
  public ButtonSize: typeof ButtonSize = ButtonSize;

  public recommendationService = inject(FavoritesService);

  private store = inject(Store);

  ngOnInit(): void {
    this.buildForm();
  }

  public manageCart(product: IProduct, quantity: string): void {
    this.form.checkedCart.value
      ? this.store.dispatch(addProduct({ product, quantity }))
      : this.store.dispatch(removeAllEntriesOfProduct(product));
  }

  public decreaseValue(): void {
    if (this.form.quantity?.value > 1) {
      this.form.quantity.setValue(this.form.quantity?.value - 1);
    }
  }

  public increaseValue(): void {
    this.form.quantity.setValue(+this.form.quantity?.value + 1);
  }

  get form(): IItemForm {
    return this.quantityForm.controls;
  }

  private buildForm(): void {
    const itemInCart = this.addedToCart?.find(
      item => item.product.id === this.product.id
    );

    this.quantityForm = new FormGroup<IItemForm>({
      quantity: new FormControl(itemInCart?.count || 1, {
        nonNullable: true,
      }),
      checkedCart: new FormControl(!!itemInCart, { nonNullable: true }),
    });
  }
}
