import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { Observable } from 'rxjs';

import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { selectGroupedCartEntries } from '../../state/cart/cart.selectors';
import { selectAllProducts } from '../../state/products/products.selectors';
import { loadProducts } from '../../state/products/products.actions';
import { SearchInputComponent } from '@core/shared/components/search-input/search-input.component';
import { IPageSizeParams } from '@core/shared/components/custom-slider/slider.interface';
import { CustomSliderComponent } from '@core/shared/components/custom-slider/custom-slider.component';
import { ItemComponent } from './item/item.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { IProduct, IProductGroup } from '@core/shared/common_types/interfaces';
import { FilterPipe } from '@core/pipes/filter.pipe';
import { FilterService } from '@core/services/filter.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    SearchInputComponent,
    CustomSliderComponent,
    NgxPaginationModule,
    ItemComponent,
    CommonModule,
    FilterPipe,
    SearchPipe,
    MatInputModule,
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
    this.store.dispatch(loadProducts());
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
