import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@core/components/button/button.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../pages/products-page/types/product-interfaces';
import { selectPopularProducts } from '../../state/products/products.selectors';
import { FavoritesService } from '../favorites/favorites.service';
import { ButtonSize } from '@core/components/button/button';

@Component({
  selector: 'app-popular-products',
  imports: [CommonModule, ButtonComponent, MatCardModule, RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  public popularProducts$: Observable<IProduct[]>;
  protected readonly ButtonSize = ButtonSize;

  public favoritesService = inject(FavoritesService);
  private store = inject(Store);

  constructor() {
    this.popularProducts$ = this.store.select(selectPopularProducts);
  }
}
