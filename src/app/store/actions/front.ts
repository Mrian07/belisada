import { Action } from '@ngrx/store';


export const GETDETAIL = 'GETDETAIL';
export const GETDETAILSSUCCESS = 'GETDETAILSUCCESS';
export const GETHOME = 'GETHOME';
export const GETHOMESUCCESS = 'GETHOMESUCCESS';
export const GETLIST = 'GETLIST';
export const GETLISTSUCCESS = 'GETLISTSUCCESS';
export const GETCATEGORY = 'GETCATEGORY';
export const GETCATEGORYSUCCESS = 'GETCATEGORYSUCCESS';
export const GETNAV = 'GETNAV';
export const GETNAVSUCCESS = 'GETNAVSUCCESS';
export const GET_PAYMENT_METHOD = 'GET_PAYMENT_METHOD';
export const GET_PAYMENT_METHOD_SUCCESS = 'GET_PAYMENT_METHOD_SUCCESS';
export const FAILURE = 'FAILURE';


export class GetHome implements Action {
  readonly type = GETHOME;
  constructor() { }
}

export class GetHomeSuccess implements Action {
  readonly type = GETHOMESUCCESS;
  constructor(public top: any) {}
}

export class GetDetail implements Action {
  readonly type = GETDETAIL;
  constructor(public id: any) {}
}

export class GetDetailSuccess implements Action {
  readonly type = GETDETAILSSUCCESS;
  constructor(public detail: any) {}
}

export class GetList implements Action {
  readonly type = GETLIST;
  constructor(public params: any) { }
}

export class GetListSuccess implements Action {
  readonly type = GETLISTSUCCESS;
  constructor(public list: any) {}
}

export class GetCategory implements Action {
  readonly type = GETCATEGORY;
  constructor(public params: any) { }
}

export class GetCategorySuccess implements Action {
  readonly type = GETCATEGORYSUCCESS;
  constructor(public list: any) {}
}

export class GetNav implements Action {
  readonly type = GETNAV;
  constructor() { }
}

export class GetNavSuccess implements Action {
  readonly type = GETNAVSUCCESS;
  constructor(public nav: any) {}
}

export class GetPaymentMethod implements Action {
  readonly type = GET_PAYMENT_METHOD;
  constructor() { }
}

export class GetPaymentMethodSuccess implements Action {
  readonly type = GET_PAYMENT_METHOD_SUCCESS;
  constructor(public paymentMethods: any) {}
}

export class Failure implements Action {
  readonly type = FAILURE;
  constructor (public payload: {concern: 'GETCATEGORY' | 'GETHOME' | 'GET_PAYMENT_METHOD', error: any}) {}
}

export type HomeAction =
 | Failure
 | GetHome
 | GetHomeSuccess
 | GetList
 | GetListSuccess
 | GetCategory
 | GetCategorySuccess
 | GetNav
 | GetNavSuccess
 | GetDetail
 | GetDetailSuccess
 | GetPaymentMethod
 | GetPaymentMethodSuccess;
