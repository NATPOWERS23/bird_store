import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductsService } from '../../../pages/products-page/products.service';
import { AlertService } from '../../shared/services/alert.service';
import { ICreateForm, ImageSnippet } from './types/icreate-form';
import { MaterialModule } from '@core/material/material.module';
import { FileUploaderService } from 'src/app/admin/shared/components/file-uploader/file-uploader.component';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgClass,
    NgIf,
    NgStyle,
    FileUploaderService,
  ],
})
export class CreateComponent implements OnInit {
  public selectedFile: ImageSnippet | undefined;
  public createForm: FormGroup = new FormGroup({});
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductsService);
  private alert = inject(AlertService);

  ngOnInit(): void {
    this.buildForm();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  public submit(): void {
    if (this.createForm.invalid) {
      return;
    }
    if (this.selectedFile?.src) {
      const product: IProduct = {
        ...this.createForm.value,
        id: this.createForm.value.name,
        imageUrl: this.selectedFile.src,
      };
      this.productService
        .create(product)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.createForm.reset();
          this.createForm.markAsUntouched();
          this.alert.success('Товар успішно створений');
        });
    } else {
      this.alert.danger('Будь ласка, додай фото товару');
    }
  }

  private buildForm(): void {
    this.createForm = this.formBuilder.group<ICreateForm>({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
    });
  }
}
