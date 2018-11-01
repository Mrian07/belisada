import { Action } from '@ngrx/store';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
  LOAD          = '[Address] Load',
  LOAD_SUCCESS  = '[Address] Load Success',
  LOAD_FAIL     = '[Address] Load Fail'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: GetShippingResponse[]) { }
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
            = LoadAction
            | LoadSuccessAction
            | LoadFailAction;
