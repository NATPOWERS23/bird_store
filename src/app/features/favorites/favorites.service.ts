import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface IRecommendationData {
  favorites: string[];
  interactions: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private LOCAL_STORAGE_KEY = 'userData';

  http = inject(HttpClient);

  constructor() {}

  addFavorite(itemId: string): void {
    const data: IRecommendationData = this.getLocalData();
    if (!data.favorites.includes(itemId)) {
      data.favorites.push(itemId);
      this.saveLocalData(data);
      this.syncPopularProductsWithServer(data.favorites);
    }
  }

  removeFavorite(itemId: string): void {
    const data: IRecommendationData = this.getLocalData();
    data.favorites = data.favorites.filter((id: string) => id !== itemId);
    this.saveLocalData(data);
  }

  private getLocalData(): IRecommendationData {
    return JSON.parse(
      localStorage.getItem(this.LOCAL_STORAGE_KEY) ||
        '{"favorites": [], "interactions": {}}'
    );
  }

  private saveLocalData(data: IRecommendationData): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  private syncPopularProductsWithServer(favorites: string[]) {
    const url = environment.fbConfig.fbFunctionsUrls['syncPopularProducts'];
    const params = new HttpParams({
      fromObject: {
        favorites: favorites.join(','),
      },
    });

    this.http.get(url, { params }).subscribe({
      next: () => {},
      error: err => console.log('Error occurred during sync popular', err),
    });
  }
}
