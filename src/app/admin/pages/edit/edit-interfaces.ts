import { FormControl } from '@angular/forms';
import { ImageSnippet } from '../create/types/icreate-form';

export interface IEditForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
  imageUrl: FormControl<ImageSnippet>;
}
