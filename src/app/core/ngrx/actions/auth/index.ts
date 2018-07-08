import { Action } from '@ngrx/store';

export const TRYLOGIN = 'TRYLOGIN';
export const LOGIN = 'LOGIN';
export const LOGINSUCCESS = 'LOGINSUCCESS';
export const LOGINFAILED = 'LOGINFAILED';
export const CHECKEMAIL = 'CHECKEMAIL';
export const ACTIVATION = 'ACTIVATION';
export const SENDEMAIL = 'SENDEMAIL';
export const CHECKTOKEN = 'CHECKTOKEN';
export const RESETPASSWORD = 'RESETPASSWORD';


export class TryLogin implements Action {
  readonly type = TRYLOGIN;
  constructor(public status: any) { }
}
export class Login implements Action {
  readonly type = LOGIN;
  constructor(public status: any) { }
}
export class LoginSuccess implements Action {
  readonly type = LOGINSUCCESS;
  constructor(public status: any) { }
}
export class LoginFailed implements Action {
  readonly type = LOGINFAILED;
  constructor(public status: any) { }
}
export class CheckEmail implements Action {
  readonly type = CHECKEMAIL;
  constructor(public status: any) { }
}
export class Activation implements Action {
  readonly type = ACTIVATION;
  constructor(public status: any) { }
}
export class SendEmail implements Action {
  readonly type = SENDEMAIL;
  constructor(public status: any) { }
}
export class CheckToken implements Action {
  readonly type = CHECKTOKEN;
  constructor(public status: any) { }
}
export class ResetPassword implements Action {
  readonly type = RESETPASSWORD;
  constructor(public status: any) { }
}


export type AuthAction = CheckEmail
| TryLogin
| Login
| LoginSuccess
| LoginFailed
| Activation
| SendEmail
| CheckToken
| ResetPassword;
