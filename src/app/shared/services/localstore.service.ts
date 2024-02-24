import { Injectable } from '@angular/core';
import { CartState } from 'src/app/state/cart/cart-state.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalstoreService {
  public setSavedState(state: CartState, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  public getSavedState(localStorageKey: string): CartState | null {
    return localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) as string)
      : null;
  }
}
