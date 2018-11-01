import { Action } from '@ngrx/store';
import { ProductDetailV2 } from '@belisada/core/models';

export enum ActionTypes {
  LOAD                = '[Product Details] Load',
  LOAD_SUCCESS        = '[Product Details] Load Success',
  LOAD_FAIL           = '[Product Details] Load Fail',
}

/**
 * Product detail Actions
 */
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public id: number, public payload: any) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: ProductDetailV2) { }
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
