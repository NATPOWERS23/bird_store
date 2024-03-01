import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

@Pipe({
  name: 'filterProducts',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    products: IProduct[] | null,
    filter: { [key: string]: boolean } | undefined
  ): IProduct[] {
    if (!products) return [];
    if (products && filter === undefined) return products;

    const key = Object.keys(
      filter as { [key: string]: boolean }
    )[0] as keyof IProduct;
    return products.filter(
      (item: IProduct) =>
        typeof item[key] === 'boolean' &&
        item[key] === (filter as { [key: string]: boolean })[key as string]
    );
  }
}
