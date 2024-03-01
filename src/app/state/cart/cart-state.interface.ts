import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export interface CartState {
  items: IProduct[];
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
