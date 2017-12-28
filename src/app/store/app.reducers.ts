// import * as fromSearching from './app.action';
// import { Search } from '../servers/model/search';
// import { createSelector } from '@ngrx/store/src/selector';


// export interface SearchState {
//   data: Search[];
//   loaded: boolean;
//   loading: boolean;
// }

// export const initialState: SearchState = {
//   data: [

// ],
//   loaded: false,
//   loading: false
// };
// console.log(initialState.data);
// export function SearchReducer(
//   state = initialState,
//   action: fromSearching.Searching): SearchState {
//     console.log(action.type);
//   switch (action.type) {
//     case fromSearching.SEARCHING: {
//       return {
//         ...state,
//         loading : false,
//         loaded : true
//       };
//     }
//   }
//   return state;
// }

// export const getResult = (state: SearchState) => state.data;
