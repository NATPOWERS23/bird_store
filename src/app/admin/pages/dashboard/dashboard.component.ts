import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

import { Store } from '@ngrx/store';

import { SearchPipe } from '@core/pipes/search.pipe';
import { selectAllProducts } from 'src/app/state/products/products.selectors';
import { productsActions } from 'src/app/state/products/products.actions';
import { selectError } from 'src/app/state/products/products.reducer';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [FormsModule, NgIf, SearchPipe, NgForOf, RouterLink, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public searchStr = '';

  public store = inject(Store);
  public products$ = this.store.select(selectAllProducts);
  public error$ = this.store.select(selectError);

  private alert = inject(AlertService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadData();
  }

  public remove(id: string): void {
    this.store.dispatch(productsActions.deleteProduct({ id }));
    this.handleDelete();
  }

  private handleDelete(): void {
    this.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error =>
        this.alert.danger(
          error ? 'При видаленні товару сталася помилка' : 'Товар видалено'
        )
      );
  }

  private loadData(): void {
    this.store.dispatch(productsActions.loadProducts());
  }
}
