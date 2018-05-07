import { Action } from '@ngrx/store';

export const GETPROFILE = 'GETPROFILE';
export const GETPROFILESUCCESS = 'GETPROFILESUCCESS';
export const UPDATEPROFILE = 'UPDATEPROFILE';
export const UPDATEPROFILESUCCESS = 'UPDATEPROFILESUCCESS';
export const SIGNUPBUYER = 'SIGNUPBUYER';
export const SIGNUPBUYERSUCCESS = 'SIGNUPBUYERSUCCESS';
export const SIGNUPSELLER = 'SIGNUPSELLER';
export const IPADDRESS = 'IPADDRESS';
export const ERROR = 'ERROR';
export const NEWSLETTER = 'NEWSLETTER';

export class GetProfile implements Action {
  readonly type = GETPROFILE;
  constructor(public status: any) { }
}
export class GetProfileSuccess implements Action {
  readonly type = GETPROFILESUCCESS;
  constructor(public profile: any) { }
}
export class UpdateProfile implements Action {
  readonly type = UPDATEPROFILE;
  constructor(public status: any) { }
}
export class UpdateProfileSuccess implements Action {
  readonly type = UPDATEPROFILESUCCESS;
  constructor(public status: any) { }
}
export class SignUpBuyer implements Action {
  readonly type = SIGNUPBUYER;
  constructor(public status: any) { }
}
export class SignUpBuyerSuccess implements Action {
  readonly type = SIGNUPBUYERSUCCESS;
  constructor(public status: any) { }
}
export class SignUpSeller implements Action {
  readonly type = SIGNUPSELLER;
  constructor(public status: any) { }
}
export class IpAddress implements Action {
  readonly type = IPADDRESS;
  constructor(public status: any) { }
}
export class NewsLetter implements Action {
  readonly type = NEWSLETTER;
  constructor(public status: any) { }
}
export class Error implements Action {
  readonly type = ERROR;
  constructor (public payload: {concern: 'SIGNUPBUYER' | 'SIGNUPSELLER', error: any}) {}
}

export type UserAction = GetProfile
| GetProfileSuccess
| UpdateProfile
| UpdateProfileSuccess
| SignUpBuyer
| SignUpBuyerSuccess
| SignUpSeller
| IpAddress
| NewsLetter
| Error;
