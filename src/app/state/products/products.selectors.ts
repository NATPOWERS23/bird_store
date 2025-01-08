import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products-state.interface';

export const selectAllProducts = createSelector(
  createFeatureSelector('productsEntries'),
  (state: ProductState) => state.products
);

export const selectPopularProducts = createSelector(
  selectAllProducts,
  products => [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
);
