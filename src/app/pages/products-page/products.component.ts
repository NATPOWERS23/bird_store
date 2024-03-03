import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { Observable } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { selectAllProducts } from '../../state/products/products.selectors';
import { SearchInputComponent } from '@core/components/search-input/search-input.component';
import { IPageSizeParams } from '@core/components/custom-slider/slider.interface';
import { CustomSliderComponent } from '@core/components/custom-slider/custom-slider.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FilterPipe } from '@core/pipes/filter.pipe';
import { FilterService } from '@core/services/filter.service';
import { LoaderService } from '@core/services/loader.service';
import { IProduct, IProductGroup } from './types/product-interfaces';
import { ItemComponent } from './item/item.component';
import { productsActions } from 'src/app/state/products/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    SearchInputComponent,
    CustomSliderComponent,
    NgxPaginationModule,
    CommonModule,
    FilterPipe,
    SearchPipe,
    MatInputModule,
    ItemComponent,
  ],
})
export class ProductsComponent {
  public products$: Observable<IProduct[]>;
  public cartEntries$: Observable<IProductGroup[]>;

  /*paginator*/
  public page = 1;
  public productsPerPage = 5;

  public search = '';
  public filter: { [key: string]: boolean } | undefined = undefined;

  public loader = inject(LoaderService);
  private store = inject(Store);
  private filterService = inject(FilterService);

  constructor() {
    this.store.dispatch(productsActions.loadProducts());
    this.products$ = this.store.select(selectAllProducts);
    this.cartEntries$ = this.store.select(selectGroupedCartEntries);
    this.filterService.getFilterValue().subscribe(filter => {
      this.filter = filter;
    });
  }

  public searchItem(newItem: string): void {
    this.page = 1;
    this.search = newItem;
  }

  public onPagination(data: IPageSizeParams): void {
    this.productsPerPage = data.itemsPerPage;
    this.page = data.page;
  }
}
