import { createAction, props } from '@ngrx/store';
import { CartState } from './cart-state.interface';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { HttpErrorResponse } from '@angular/common/http';

export const clearCart = createAction('[Cart] Clear Cart');

export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: IProduct; quantity: string }>()
);

export const removeProduct = createAction(
  '[Cart] Remove One Product',
  props<IProduct>()
);

export const removeAllEntriesOfProduct = createAction(
  '[Cart] Remove All Entries of Product',
  props<IProduct>()
);

export const loadCart = createAction('[Cart] Cart Entries Load');

export const loadCartSuccess = createAction(
  '[Cart] Products Load Success',
  props<{ products: IProduct[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Products Load Failure',
  props<{ error: HttpErrorResponse }>()
);
