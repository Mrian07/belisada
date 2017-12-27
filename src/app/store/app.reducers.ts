import * as fromSearching from './app.action';
import { Search } from '../servers/model/search';
import { createSelector } from '@ngrx/store/src/selector';

// import { Search } from '../servers/model/search';
// import { Action } from '@ngrx/store';
// import { Searching } from './app.action';

// const searchInitState = {
//     // searcResult: [Search],
//     searcResult: [{
//       m_product_id: 0,
//       name: 'nama',
//       name_en: 'name',
//       imageurl: 'images',
//       category: 'cats',
//       pricelist: '48304732'
//     }]

// };
// const defaultState = [Search];
// const newState = (state, newData) => {
//   return Object.assign({}, state, newData);
// };

// export function SearchReducers (state = defaultState, action: SearchingAction.SearchingAction) {
//   console.log(action.type, state);
//   switch (action.type) {
//     case SearchingAction.SEARCHING :
//       return newState(state, action.payload);
//     default :
//     return state;
//   }
// }

export interface SearchState {
  data: Search[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: SearchState = {
  data: [
    {
    m_product_id: 1066055,
    name: 'ASUS Zenfone Go [ZB690KG] [1/8GB] - Gray',
    imageurl: 'https://storage.googleapis.com/myacicoproductimg/asussmar0001000152.jpg',
    category: 'Telepon Cerdas',
    pricelist: 1399000.0,
    description: 'descriptions',
    stock: 0,
    discount: 0.0,
    description_en: '',
    weight: 1,
    isWishList: 'N',
    isOnCart: 'N',
    isNewProduct: 'N',
    highlight_en: '',
    highlight: 'highlite',
    alias: 'ASUS-Zenfone-Go-[ZB690KG]-[1/8GB]---Gray',
    specialPrice: 0.0,
    istodayshipping: 'N',
    name_en: 'ASUS Zenfone Go [ZB690KG] [1/8GB] - Gray',
    specification: []
  }
],
  loaded: false,
  loading: false
};
console.log(initialState.data);
export function SearchReducer(
  state = initialState,
  action: fromSearching.Searching): SearchState {
    console.log(action.type);
  switch (action.type) {
    case fromSearching.SEARCHING: {
      return {
        ...state,
        loading : false,
        loaded : true
      };
    }
  }
  return state;
}

export const getResult = (state: SearchState) => state.data;
