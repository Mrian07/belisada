import * as actions from '../../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Login { login: any; }
const LoginDefault = { login: null };
export interface Email { email: any; }
const EmailDefault = { email: null };
export interface Activate { activation: any; }
const ActivateDefault = { activation: null };
export interface SendEmail { sendemail: any; }
const SendEmailDefault = { sendemail: null };
export interface CheckToken { token: any; }
const TokenDefault = { token: null };
export interface ResetPassword { password: any; }
const ResetDefault = { password: null };

export const LoginAdapter = createEntityAdapter<Login>();
export const EmailAdapter = createEntityAdapter<Email>();
export const ActivateAdapter = createEntityAdapter<Activate>();
export const SendEmailAdapter = createEntityAdapter<SendEmail>();
export const TokenAdapter = createEntityAdapter<CheckToken>();
export const ResetAdapter = createEntityAdapter<ResetPassword>();

export const initialLogin: Login = LoginAdapter.getInitialState(LoginDefault);
export const initialEmail: Email = EmailAdapter.getInitialState(EmailDefault);
export const initialActive: Activate = ActivateAdapter.getInitialState(ActivateDefault);
export const initialSendEmail: SendEmail = SendEmailAdapter.getInitialState(SendEmailDefault);
export const initialToken: CheckToken = TokenAdapter.getInitialState(TokenDefault);
export const initialReset: ResetPassword = ResetAdapter.getInitialState(ResetDefault);

export function LoginReducer(
  state: Login = initialLogin,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.TRYLOGIN : {
        return action.status;
    }
    case actions.LOGIN : {
        return action.status;
    }
    case actions.LOGINSUCCESS : {
        return action.status;
    }
    case actions.LOGINFAILED : {
      return action.status;
  }
    default: return [];
  }
}
export function EmailReducer(
  state: Email = initialEmail,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.CHECKEMAIL : {
        return action.status;
    }
    default: return [];
  }
}
export function ActivateReducer(
  state: Activate = initialActive,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.ACTIVATION : {
        return action.status;
    }
    default: return [];
  }
}

export function SendEmailReducer(
  state: SendEmail = initialSendEmail,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.SENDEMAIL : {
        return action.status;
    }
    default: return [];
  }
}

export function TokenReducer(
  state: CheckToken = initialToken,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.CHECKTOKEN : {
        return action.status;
    }
    default: return [];
  }
}

export function ResetReducer(
  state: ResetPassword = initialReset,
  action: actions.AuthAction) {
  switch (action.type) {

    case actions.RESETPASSWORD : {
        return action.status;
    }
    default: return [];
  }
}

export const LoginState = createFeatureSelector<Login>('login');
export const EmailState = createFeatureSelector<Email>('email');
export const ActiveState = createFeatureSelector<Activate>('activate');
export const SendState = createFeatureSelector<SendEmail>('sendemail');
export const TokenState = createFeatureSelector<CheckToken>('token');
export const ResetState = createFeatureSelector<ResetPassword>('password');


