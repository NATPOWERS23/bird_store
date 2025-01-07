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
import { NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductsService } from '../../../pages/products-page/products.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { ICreateForm } from './types/icreate-form';
import { MaterialModule } from '@core/material/material.module';
import { IProduct } from 'src/app/pages/products-page/types/product-interfaces';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgClass,
    NgIf,
    FileUploaderComponent,
  ],
})
export class CreateComponent implements OnInit {
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

    const product: IProduct = {
      ...this.createForm.value,
      id: this.createForm.value.name,
      imageUrl: this.createForm.value.imageUrl?.src,
    };
    this.productService
      .create(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.createForm.reset();
        this.createForm.markAsUntouched();
        this.alert.success('Товар успішно створений');
      });
  }

  private buildForm(): void {
    this.createForm = this.formBuilder.group<ICreateForm>({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: [
        { src: '' },
        { nonNullable: true, validators: Validators.required },
      ],
    });
  }
}
