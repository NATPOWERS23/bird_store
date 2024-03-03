import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

export const productsActions = createActionGroup({
  source: 'products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: IProduct[] }>(),
    'Load Products Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': props<{ id: string }>(),
    'Delete Product Failure': props<{ error: HttpErrorResponse }>(),
  },
});
