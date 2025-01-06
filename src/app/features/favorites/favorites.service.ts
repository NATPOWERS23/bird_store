import { Injectable } from '@angular/core';

interface IRecommendationData {
  favorites: string[],
  interactions: unknown
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private LOCAL_STORAGE_KEY = 'userData';

  // Add an item to local favorites
  addFavorite(itemId: string): void {
    const data: IRecommendationData = this.getLocalData();
    if (!data.favorites.includes(itemId)) {
      data.favorites.push(itemId);
      this.saveLocalData(data);
    }
  }

  // Remove an item from local favorites
  removeFavorite(itemId: string): void {
    const data: IRecommendationData = this.getLocalData();
    data.favorites = data.favorites.filter((id: string) => id !== itemId);
    this.saveLocalData(data);
  }

  // Get local data from localStorage
  private getLocalData(): IRecommendationData {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '{"favorites": [], "interactions": {}}');
  }

  // Save data to localStorage
  private saveLocalData(data: IRecommendationData): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  // Track user interaction with an item
  // trackInteraction(itemId: string): void {
  //   const data: IRecommendationData = this.getLocalData();
  //   data.interactions[itemId] = (data.interactions[itemId] || 0) + 1;
  //   this.saveLocalData(data);
  // }
}
