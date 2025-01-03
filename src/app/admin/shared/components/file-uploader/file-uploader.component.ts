import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, forwardRef, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ImageSnippet } from 'src/app/admin/pages/create/types/icreate-form';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  imports: [NgClass, NgIf, NgStyle, AsyncPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },

    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
})
export class FileUploaderComponent implements ControlValueAccessor, Validator {
  public selectedFile: ImageSnippet = { src: '' };
  public disabled = false;
  public loading = signal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: ImageSnippet) => {};
  onTouched = () => {};
  writeValue(obj: ImageSnippet): void {
    this.selectedFile = obj;
  }
  registerOnChange(fn: (value: ImageSnippet) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  processFile(imageInput: HTMLInputElement): void {
    const file: File | undefined = imageInput?.files?.[0];
    const reader = new FileReader();
    this.loading.set(true);

    reader.addEventListener('load', (el: ProgressEvent<FileReader>) => {
      this.selectedFile = {
        file: file,
        src: el?.target?.result,
      };
      this.onChange(this.selectedFile);
      this.loading.set(false);
    });

    file ? reader.readAsDataURL(file) : this.loading.set(false);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value?.src || control.value?.src === '') {
      return { required: true };
    }
    return null;
  }
}
