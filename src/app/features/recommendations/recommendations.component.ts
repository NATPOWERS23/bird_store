import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from '../../pages/products-page/types/product-interfaces';
import { FavoritesService } from '../favorites/favorites.service';
import { CommonModule } from '@angular/common';
import { ButtonSize } from '@core/components/button/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule, MatCardModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent implements OnInit {
  recommendations: IProduct[] = [];
  popularItems = signal<IProduct[]>([]);

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

  private loadRecommendations(): void {}

  protected readonly ButtonSize = ButtonSize;
}
