import { CartState } from './cart/cart-state.interface';
import { ProductState } from './products/products-state.interface';
import { IProduct } from '../pages/products-page/types/product-interfaces';
import { UserState } from './admin/login/user-state.interface';

export interface AppState {
  cart: CartState;
  products: ProductState;
  item: IProduct;
  user: UserState;
}
