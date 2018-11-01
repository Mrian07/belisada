import { Action } from '@ngrx/store';
import { ProductDetailV2Store } from '@belisada/core/models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
  LOAD          = '[Product Detail Store] Load',
  LOAD_SUCCESS  = '[Product Detail Store] Load Success',
  LOAD_FAIL     = '[Product Detail Store] Load Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public id: number, public payload: any) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: ProductDetailV2Store) { }
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
