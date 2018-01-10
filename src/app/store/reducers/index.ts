import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import 'rxjs/add/observable/empty';
import * as actions from '../actions';
import * as front from '../actions/front';
import { SellerProduct } from '../../core/model/product';

export interface Product {
  product: any;
}
export interface Store {
  store: any;
}
export interface Bank {
  bank: any;
}

export interface User {
  user: any;
}

export interface Home {
  entities: {
    home: any;
  };
}

export interface Brand {
  brands: any;
}

export interface Detail {
  detail: any;
}

export const productAdapter = createEntityAdapter<Product>();
export interface Products extends EntityState<Product> { }

export const storeAdapter = createEntityAdapter<Store>();
export interface Stores extends EntityState<Store> { }

export const bankAdapter = createEntityAdapter<Bank>();
export interface Banks extends EntityState<Bank> { }

export const userAdapter = createEntityAdapter<User>();
export interface Users extends EntityState<User> { }

export const homeAdapter = createEntityAdapter<Home>();
export interface Homes extends EntityState<Home> { }

export const brandAdapter = createEntityAdapter<Detail>();
export interface Details extends EntityState<Detail> { }



const defaultProduct = {
  product: null,
};
const defaultStore = {
  store: null,
};
const defaultBank = {
  bank: [],
};
const defaultHome = {
  entities: {
    home: []
  }
};

const defaultUser = {
  store: null,
};

const defaultDetail = {
  detail: null,
};


export const initialStateProduct: Product = productAdapter.getInitialState(defaultProduct);
export const initialStateStore: Stores = storeAdapter.getInitialState(defaultStore);
export const initialStateBank: Banks = bankAdapter.getInitialState(defaultProduct);
export const initialStateUser: Users = userAdapter.getInitialState(defaultUser);
export const initialStateHome: Homes = homeAdapter.getInitialState(defaultHome);
export const initialStateDetail: Details = brandAdapter.getInitialState(defaultDetail);

export function ProductReducer(
  state: Product = initialStateProduct,
  action: actions.ProductAction) {

  switch (action.type) {

    case actions.GETPRODUCTSUCCESS : {
      return action.product;
    }

    case actions.GETSTORELIST : {
        return action.store;
    }

    case actions.ADDPRODUCTSUCCESS : {
      return action.success;
    }

    case actions.EDITPRODUCTSUCCESS : {
      return action.success;
    }

    default: return [];
  }
}

export function StoreReducer(
  state: Stores = initialStateStore,
  action: actions.ProductAction) {

  switch (action.type) {

    case actions.GETSTORELIST : {
        return action.store;
    }

    default: return [];
  }
}

export function BankReducer(
  state: Banks = initialStateBank,
  action: actions.ProductAction) {
  switch (action.type) {

    case actions.ADDBANKSUCCESS : {
      console.log(action.success);
        return action.success;
    }

    case actions.EDITBANKSUCCESS : {
      console.log(action.success);
        return action.success;
    }

    case actions.GETBANKLIST : {
      console.log(action.bank);
        return action.bank;
    }

    case actions.DELETEBANKSUCCESS : {
      console.log(action.success);
        return [action.success];
    }

    default: return [];
  }
}

// export function UserReducer(
//   state: Users = initialStateUser,
//   action: actions.ProductAction) {

//   switch (action.type) {

//     case actions.GETHOMESUCCESS : {
//         return action.success;
//     }

//     default: return state;
//   }
// }

export function HomeReducer(
  state: Homes = initialStateHome,
  action: front.HomeAction) {

  switch (action.type) {

    case front.GETHOMESUCCESS : {
      return action.top;
  }

    default: return [];
  }
}

export function DetailReducer(
  state: Details = initialStateDetail,
  action: front.HomeAction) {

  switch (action.type) {

    case front.GETDETAILSSUCCESS : {
      return action.detail;
    }
    default: return {};
  }
}

export const getProductState = createFeatureSelector<Products>('product');
export const getStoreState = createFeatureSelector<Stores>('store');
export const getBankState = createFeatureSelector<Banks>('bank');
export const getUserState = createFeatureSelector<Users>('user');
export const getHomeState = createFeatureSelector<Homes>('home');
export const getDetailState = createFeatureSelector<Details>('detail');

