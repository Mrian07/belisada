import * as actions from '../actions/address.action';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: GetShippingResponse[];
}

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  failed: false,
  data: null
};

export function reducer(state = INITIAL_STATE, action: actions.Actions ): State {
  if (!action) return state;

  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        data: action.payload
      });
    }
    case actions.ActionTypes.LOAD_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        failed: false,
        data: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getData = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getFailed = (state: State) => state.failed;
