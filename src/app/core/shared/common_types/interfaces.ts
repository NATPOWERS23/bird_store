export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  onSale: boolean;
}

export interface IProductGroup {
  product: IProduct;
  count: number;
}