import {CommonModule} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@core/components/button/button.component';
import {IProduct} from '../../pages/products-page/types/product-interfaces';
import {FavoritesService} from '../favorites/favorites.service';
import { ButtonSize } from '@core/components/button/button';
import {PopularProductsService} from './popular-products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CommonModule, ButtonComponent, MatCardModule, RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit {
  recommendations: IProduct[] = [];
  popularItems = signal<IProduct[]>([]);
  protected readonly ButtonSize = ButtonSize;

  private popularService = inject(PopularProductsService)

  constructor(private recommendationService: FavoritesService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  addFavorite(itemId: string): void {
    this.recommendationService.addFavorite(itemId);
    this.loadRecommendations();
  }

  removeFavorite(itemId: string): void {
    this.recommendationService.removeFavorite(itemId);
    this.loadRecommendations();
  }

  private loadRecommendations(): void {
    this.popularService.fetchPopularItems().subscribe(res => this.popularItems.set(res));
  }
}
