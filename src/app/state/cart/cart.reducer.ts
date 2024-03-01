import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState } from './cart-state.interface';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export const cartFeatureKey = 'cart';

export const initialCartState: CartState = {
  items: [],
  status: '',
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.clearCart, (state: CartState) => ({ ...state, items: [] })),

  on(
    CartActions.addProduct,
    (state: CartState, req: { product: IProduct; quantity: string }) => {
      const entriesClone: CartState = JSON.parse(JSON.stringify(state));
      entriesClone.items.push(req.product);
      for (const _ of Array(+req.quantity - 1).keys()) {
        entriesClone.items.push(req.product);
      }
      return entriesClone;
    }
  ),

  on(CartActions.removeProduct, (state: CartState, product: IProduct) => {
    const entriesClone: CartState = JSON.parse(JSON.stringify(state));
    const clearArray = entriesClone.items?.filter(
      (item: IProduct) => item.id !== product.id
    );
    const currentProducts = entriesClone.items?.filter(
      (item: IProduct) => item.id === product.id
    );
    currentProducts.length = currentProducts.length - 1;
    entriesClone.items = clearArray.concat(currentProducts);

    return entriesClone;
  }),

  on(
    CartActions.removeAllEntriesOfProduct,
    (state: CartState, product: IProduct) => {
      const entriesClone: CartState = JSON.parse(JSON.stringify(state));
      entriesClone.items = entriesClone.items?.filter(
        (item: IProduct) => item.id !== product.id
      );
      return entriesClone;
    }
  ),

  on(CartActions.loadCart, (state: CartState) => {
    return { ...state, status: 'loading' };
  }),

  on(CartActions.loadCartSuccess, (state: CartState, cart) => {
    return {
      ...state,
      cart: cart,
      error: null,
      status: 'success',
    };
  }),

  on(CartActions.loadCartFailure, (state: CartState, error) => {
    return {
      ...state,
      error: error,
      status: 'error',
    };
  })
);
