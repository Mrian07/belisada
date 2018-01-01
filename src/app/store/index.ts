// import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
// import * as fromProductReducer from './reducers';

// export interface ProductState {
//   product:
// }

// export const reducers: ActionReducerMap<ProductState> = {
//   product: fromSearchReducer.SearchReducer,
// };

// export const getProductState = createFeatureSelector<ProductState>('product');



// export const getResultState = createSelector(getProductState, (state: ProductState) => state.product);

// export const getAll = createSelector(getResultState, fromSearchReducer.getResult);

import { ActionReducerMap } from '@ngrx/store';
import { ProductReducer } from '../store/reducers';

export const reducers: ActionReducerMap<any> = {
    pizza: ProductReducer
};
