import { createReducer, on } from '@ngrx/store';
import * as ProductsAction from '../products/products.actions';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { ProductState } from './products-state.interface';

export const productsFeatureKey = 'products';

export const initialProductsState: ProductState = {
  products: [],
  status: '',
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsAction.loadProducts, state => {
    return { ...state, status: 'loading' };
  }),

  on(ProductsAction.loadProductsSuccess, (state: ProductState, products) => {
    return {
      ...state,
      products: products.products,
      error: null,
      status: 'success',
    };
  }),

  on(ProductsAction.loadProductsFailure, (state: ProductState, error) => {
    return {
      ...state,
      error: error.error,
      status: 'error',
    };
  })
);
