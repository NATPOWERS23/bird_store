import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // @ts-ignore
  public filterValue$: BehaviorSubject<{ [key: string]: boolean } | undefined> =
    new BehaviorSubject(undefined);

  public setFilterValue(value: { [key: string]: boolean }): void {
    this.filterValue$.next(value);
  }

  public getFilterValue(): Observable<{ [key: string]: boolean } | undefined> {
    return this.filterValue$;
  }

  public clearFilters(): void {
    this.filterValue$.next(undefined);
  }
}
