import { Action } from '@ngrx/store';

export const USERS = 'USERS';
export const TOKEN = 'TOKEN';

export class UserState implements Action {
  readonly type = USERS;
  constructor(public payload: any) {}
}

export class UserToken implements Action {
  readonly type = TOKEN;
  constructor(public payload: any) {}
}

export type All = UserState | UserToken;
