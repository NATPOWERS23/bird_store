import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export interface ProductState {
  products: IProduct[];
  error: null;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
