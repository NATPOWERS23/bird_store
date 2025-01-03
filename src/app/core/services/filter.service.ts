import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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
