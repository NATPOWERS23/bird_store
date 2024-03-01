import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from '../products/products.actions';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export const productsFeatureKey = 'products';

export const initialProductsState: IProduct[] = [];

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsAction.loadProducts, state => {
    return { ...state, status: 'loading' };
  }),

  on(ProductsAction.loadProductsSuccess, (state, products) => {
    return {
      ...state,
      products: products.products,
      error: null,
      status: 'success',
    };
  }),

  on(ProductsAction.loadProductsFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: 'error',
    };
  })
);
