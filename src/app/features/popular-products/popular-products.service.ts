import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { IProduct } from '../../pages/products-page/types/product-interfaces';
import { ProductsService } from '../../pages/products-page/products.service';

@Injectable({
  providedIn: 'root',
})
export class PopularProductsService {
  private readonly POPULAR_PRODUCTS_AMOUNT = 10;
  private productsService = inject(ProductsService);

  public fetchPopularItems(
    limitCount: number = this.POPULAR_PRODUCTS_AMOUNT
  ): Observable<IProduct[]> {
    return this.productsService.getPopular(limitCount);
  }
}
