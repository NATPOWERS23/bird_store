import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from '../../pages/products-page/types/product-interfaces';
import { FavoritesService } from '../favorites/favorites.service';
import { CommonModule, NgFor } from '@angular/common';
import { PageTitleComponent } from '@core/components/page-title/page-title.component';
import { ButtonSize } from '@core/components/button/button';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@core/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  imports: [CommonModule, PageTitleComponent, ButtonComponent, MatCardModule, RouterLink],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent implements OnInit {
  recommendations: IProduct[] = [];
  popularItems = signal<IProduct[]>([]);

  constructor(private recommendationService: FavoritesService) {}

  ngOnInit(): void {
    this.loadRecommendations();
    this.recommendationService.fetchPopularItems().subscribe(v => {
      this.popularItems.set(v)
    });
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
    // const data = JSON.parse(localStorage.getItem('userData') || '{}');
    // const favorites = data.favorites || [];
    //
    // // Simple local recommendation logic: show popular items not in favorites
    // this.recommendations = this.popularItems.filter(
    //   item => !favorites.includes(item.id)
    // );
  }

  protected readonly ButtonSize = ButtonSize;
}
