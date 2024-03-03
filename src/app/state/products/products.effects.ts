import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, of, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProductsService } from '../../pages/products-page/products.service';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { productsActions } from './products.actions';

export const LoadProductsEffects = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productsActions.loadProducts),
      switchMap(() =>
        productsService.getAll().pipe(
          map((products: IProduct[]) =>
            productsActions.loadProductsSuccess({ products: products })
          ),
          catchError((error: HttpErrorResponse) =>
            of(productsActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const DeleteProductEffects = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productsActions.deleteProduct),
      switchMap(({ id }) =>
        productsService.remove(id).pipe(
          map(() => productsActions.deleteProductSuccess({ id })),
          catchError((error: HttpErrorResponse) =>
            of(productsActions.deleteProductFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
