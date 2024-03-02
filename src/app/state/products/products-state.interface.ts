import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export interface ProductState {
  products: IProduct[];
  error: HttpErrorResponse | null;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
