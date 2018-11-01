import { Action } from '@ngrx/store';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
  LOAD = '[Shipping Method] Load',
  LOAD_SUCCESS = '[Shipping Method] Load Success',
  LOAD_FAIL = '[Shipping Method] Load Fail',
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

  constructor(public payload: ShippingRate[]) { }
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
