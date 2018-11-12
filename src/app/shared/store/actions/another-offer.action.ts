import { Action } from '@ngrx/store';
import { AnotherOffers } from '@belisada/core/models';

export const ActionTypes = {
  LOAD:         'Load',
  LOAD_SUCCESS: 'Load Success',
  LOAD_FAIL:    'Load Fail'
};

/**
 * Product ADD Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Array<AnotherOffers>) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;

