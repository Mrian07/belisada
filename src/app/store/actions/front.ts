import { Action } from '@ngrx/store';


export const GETDETAIL = 'GETDETAIL';
export const GETDETAILSSUCCESS = 'GETDETAILSUCCESS';
export const GETHOME = 'GETHOME';
export const GETHOMESUCCESS = 'GETHOMESUCCESS';
export const GETLIST = 'GETLIST';
export const GETLISTSUCCESS = 'GETLISTSUCCESS';


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

export type HomeAction =
 | GetHome
 | GetHomeSuccess
 | GetList
 | GetListSuccess
 | GetDetail
 | GetDetailSuccess;
