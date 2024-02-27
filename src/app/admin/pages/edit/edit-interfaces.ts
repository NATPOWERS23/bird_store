import { FormControl } from '@angular/forms';

export interface IEditForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
  imageUrl: FormControl<string | null>;
}
