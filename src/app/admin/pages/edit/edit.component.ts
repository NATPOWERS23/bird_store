import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs/operators';

import { AlertService } from '../../shared/components/alert/alert.service';
import { ProductsService } from '../../../pages/products-page/products.service';
import { EditPageParams, IEditForm } from './edit-interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FileUploaderComponent,
  ],
})
export class EditComponent implements OnInit {
  public editForm!: FormGroup<IEditForm>;
  public product: IProduct | undefined = undefined;

  private route$ = inject(ActivatedRoute).params as Observable<EditPageParams>;
  private router = inject(Router);
  private alert = inject(AlertService);
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.createEditForm();
    this.loadProductData();
  }

  public submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.productService
      .update({
        ...this.product,
        name: this.editForm.value.name,
        price: this.editForm.value.price,
        imageUrl: this.editForm.value.imageUrl?.src,
        description: this.editForm.value.description,
      } as IProduct)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.alert.warning('Товар оновлено');
        this.router.navigate(['/admin/dashboard']);
      });
  }

  private createEditForm(): void {
    this.editForm = new FormGroup<IEditForm>({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(
        { src: '' },
        { nonNullable: true, validators: Validators.required }
      ),
    });
  }

  private loadProductData(): void {
    this.route$
      .pipe(
        switchMap((params: EditPageParams) =>
          this.productService.getById(params['id'])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((product: IProduct) => {
        this.product = product;
        this.editForm.patchValue({
          ...product,
          imageUrl: { src: product.imageUrl },
        });
      });
  }
}
