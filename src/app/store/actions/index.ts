import { Action } from '@ngrx/store';
import { SellerProduct } from '../../core/model/product';

export const GETPRODUCT = 'GETPRODUCT';
export const GETPRODUCTSUCCESS = 'GETPRODUCTSUCCESS';
export const GETSTORE = 'GETSTORE';
export const GETSTORELIST = 'GETSTORELIST';
export const ADDBANK = 'ADDBANK';
export const ADDBANKSUCCESS = 'ADDBANKSUCCESS';
export const EDITBANK = 'EDITBANK';
export const EDITBANKSUCCESS = 'EDITBANKSUCCESS';
export const GETBANK = 'GETBANK';
export const GETBANKLIST = 'GETBANKLIST';
export const DELETEBANKLIST = 'DELETEBANKLIST';
export const DELETEBANKSUCCESS = 'DELETEBANKSUCCESS';
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

export class AddBank implements Action {
  readonly type = ADDBANK;
  constructor(public data: any) {}
}

export class AddBankSuccess implements Action {
  readonly type = ADDBANKSUCCESS;
  constructor(public success: any) {}
}

export class EditBank implements Action {
  readonly type = EDITBANK;
  constructor(public data: any) {}
}

export class EditBankSuccess implements Action {
  readonly type = EDITBANKSUCCESS;
  constructor(public success: any) {}
}

export class GetBank implements Action {
  readonly type = GETBANK;
  constructor(public token: string) {}
}

export class GetBankList implements Action {
  readonly type = GETBANKLIST;
  constructor(public bank: any) {}
}

export class DeleteBankList implements Action {
  readonly type = DELETEBANKLIST;
  constructor(public data: any) {}
}

export class DeleteBankSuccess implements Action {
  readonly type = DELETEBANKSUCCESS;
  constructor(public success: any) {}
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
  constructor(public success: any) {}
}
export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'ADDPRODUCT' | 'DELETEBANKLIST', error: any}) {}
}
export type ProductAction =
 | GetProduct
 | GetProductSuccess
 | AddProduct
 | AddProductSuccess
 | AddBank
 | AddBankSuccess
 | EditBank
 | EditBankSuccess
 | GetBank
 | GetBankList
 | DeleteBankList
 | DeleteBankSuccess
 | GetStore
 | GetStoreList
 | Failure;
