import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearchReducer from './app.reducers';

export interface ProductState {
  product: fromSearchReducer.SearchState;
}

export const reducers: ActionReducerMap<ProductState> = {
  product: fromSearchReducer.SearchReducer,
};

export const getProductState = createFeatureSelector<ProductState>('product');

// const state = {
//   product: {
//     product: {
//       data: [],
//       loaded: false,
//       loading: false
//     }
//   }
// };

export const getResultState = createSelector(getProductState, (state: ProductState) => state.product);

export const getAll = createSelector(getResultState, fromSearchReducer.getResult);
