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
import { ActivatedRoute, Params } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs/operators';

import { AlertService } from '../../shared/services/alert.service';
import { ProductsService } from '../../../pages/products-page/products.service';
import { IEditForm } from './edit-interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageSnippet } from '../create/types/icreate-form';
import { FileUploaderService } from '../../shared/components/file-uploader/file-uploader.component';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

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
    FileUploaderService,
  ],
})
export class EditComponent implements OnInit {
  public editForm!: FormGroup<IEditForm>;
  public product: IProduct | undefined = undefined;
  public selectedFile: ImageSnippet = { src: '' };
  public submitted = false;

  private route$ = inject(ActivatedRoute).params;
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

    this.submitted = true;

    if (this.selectedFile.src) {
      this.productService
        .update({
          ...this.product,
          name: this.editForm.value.name,
          price: this.editForm.value.price,
          imageUrl: this.selectedFile.src,
          description: this.editForm.value.description,
        } as IProduct)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.submitted = false;
          this.alert.warning('Товар оновлено');
        });
    }
  }

  private createEditForm(): void {
    this.editForm = new FormGroup<IEditForm>({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  private loadProductData(): void {
    this.route$
      .pipe(
        switchMap((params: Params) =>
          this.productService.getById(params['id'])
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((product: IProduct) => {
        this.product = product;
        this.editForm.patchValue({ ...product });
      });
  }
}
