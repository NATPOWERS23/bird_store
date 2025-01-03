import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductState } from './products-state.interface';
import { productsActions } from './products.actions';
import { StateStatus } from '../app.state';

export const initialProductsState: ProductState = {
  products: [],
  status: '',
  error: null,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialProductsState,
    on(productsActions.loadProducts, state => ({
      ...state,
      error: null,
      status: 'loading' as StateStatus,
    })),

    on(
      productsActions.loadProductsSuccess,
      (state: ProductState, products) => ({
        ...state,
        products: products.products,
        error: null,
        status: 'success' as StateStatus,
      })
    ),

    on(productsActions.loadProductsFailure, (state: ProductState, error) => ({
      ...state,
      error: error.error,
      status: 'error' as StateStatus,
    })),

    on(productsActions.deleteProduct, (state: ProductState) => ({
      ...state,
      error: null,
      status: 'loading' as StateStatus,
    })),

    on(productsActions.deleteProductSuccess, (state: ProductState, action) => ({
      ...state,
      products: state.products.filter(item => item.id !== action.id),
      error: null,
      status: 'success' as StateStatus,
    })),

    on(productsActions.deleteProductFailure, (state: ProductState, error) => ({
      ...state,
      error: error.error,
      status: 'error' as StateStatus,
    }))
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productsReducer,
  selectError,
} = productsFeature;
