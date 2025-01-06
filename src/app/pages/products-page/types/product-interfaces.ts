import { FormControl } from '@angular/forms';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  onSale: boolean;
  rating?: IProductRating;
}

export interface IProductRating {
  count: number
}

export interface IProductGroup {
  product: IProduct;
  count: number;
}

export interface IItemForm {
  quantity: FormControl<number>;
  checkedCart: FormControl<boolean>;
}

export interface FbCreateResponse {
  id: string;
  name: string;
}
