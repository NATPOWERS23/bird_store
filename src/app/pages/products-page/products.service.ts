import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { FbCreateResponse, IProduct } from './types/product-interfaces';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient)

  public create(product: IProduct): Observable<IProduct> {
    return this.http
      .post<IProduct>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((response: FbCreateResponse) => {
          return { ...product, id: response.name, name: product.name };
        })
      );
  }

  public getAll(): Observable<IProduct[]> {
    return this.http
      .get<{ [key: string]: IProduct }>(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map((response: { [key: string]: IProduct }) => {
          return Object.keys(response).map((key: string) => ({
            ...response[key],
            id: key,
            name: response[key].name,
          }));
        })
      );
  }

  public getById(id: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map((product: IProduct) => {
          return { ...product, id, name: product.name };
        })
      );
  }

  public update(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `${environment.fbDbUrl}/products/${product.id}.json`,
      product
    );
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`);
  }

  public getPopular(limitCount: number): Observable<IProduct[]> {
    return this.http
      .get<{ [key: string]: IProduct }>(
        `${environment.fbDbUrl}/products.json?orderBy="rating"&limitToLast=${limitCount}`
      )
      .pipe(
        map((response: { [key: string]: IProduct }) => {
          return Object.keys(response).map((key: string) => ({
            ...response[key],
            id: key,
            name: response[key].name,
          }));
        })
      );
  }
}
