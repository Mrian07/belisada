import { Action } from '@ngrx/store';
import { SellerProduct } from '../../core/model/product';

export const GETPRODUCT = 'GETPRODUCT';
export const GETPRODUCTSUCCESS = 'GETPRODUCTSUCCESS';
export const GETSTORE = 'GETSTORE';
export const GETSTORELIST = 'GETSTORELIST';
export const GETBANK = 'GETBANK';
export const GETBANKLIST = 'GETBANKLIST';
export const ADDPRODUCT = 'ADDPRODUCT';
export const ADDPRODUCTSUCCESS = 'ADDPRODUCTSUCCESS';
export const FAILURE = 'FAILURE';

export class GetProduct implements Action {
  readonly type = GETPRODUCT;
  constructor(public productid: any) {}
}
export class GetStore implements Action {
  readonly type = GETSTORE;
  constructor(public token: string) {}
}

export class GetStoreList implements Action {
  readonly type = GETSTORELIST;
  constructor(public store: any) {}
}

export class GetBank implements Action {
  readonly type = GETBANK;
  constructor(public token: string) {}
}

export class GetBankList implements Action {
  readonly type = GETBANKLIST;
  constructor(public bank: any) {}
}

export class GetProductSuccess implements Action {
  readonly type = GETPRODUCTSUCCESS;
  constructor(public product: any) {}
}

export class AddProduct implements Action {
  readonly type = ADDPRODUCT;
  constructor(public product: any) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADDPRODUCTSUCCESS;
  constructor(public success: boolean) {}
}
export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'ADDPRODUCT', error: any}) {}
}
export type ProductAction =
 | GetProduct
 | GetProductSuccess
 | AddProduct
 | AddProductSuccess
 | GetBank
 | GetBankList
 | GetStore
 | GetStoreList
 | Failure;
