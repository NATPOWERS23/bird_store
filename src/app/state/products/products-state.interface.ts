import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { StateStatus } from '../app.state';

export interface ProductState {
  products: IProduct[];
  error: HttpErrorResponse | null;
  status: StateStatus;
}
