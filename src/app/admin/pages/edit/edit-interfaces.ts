import { FormControl } from '@angular/forms';
import { ImageSnippet } from '../create/types/icreate-form';
import { Params } from '@angular/router';

export interface IEditForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
  imageUrl: FormControl<ImageSnippet>;
}

export interface EditPageParams extends Params {
  id: string;
}
