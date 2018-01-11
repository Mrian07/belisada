import { Action } from '@ngrx/store';


export const GETDETAIL = 'GETDETAIL';
export const GETDETAILSSUCCESS = 'GETDETAILSUCCESS';
export const GETHOME = 'GETHOME';
export const GETHOMESUCCESS = 'GETHOMESUCCESS';


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
  constructor(public id: any) { console.log(id); }
}

export class GetDetailSuccess implements Action {
  readonly type = GETDETAILSSUCCESS;
  constructor(public detail: any) {}
}

export type HomeAction =
 | GetHome
 | GetHomeSuccess
 | GetDetail
 | GetDetailSuccess;
