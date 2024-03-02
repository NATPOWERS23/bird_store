import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export interface CartState {
  items: IProduct[];
  error: null | HttpErrorResponse;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}
