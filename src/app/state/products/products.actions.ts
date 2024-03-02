import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: HttpErrorResponse }>()
);
