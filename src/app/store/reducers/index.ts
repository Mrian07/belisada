import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import 'rxjs/add/observable/empty';
import * as actions from '../actions';
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

export const productAdapter = createEntityAdapter<Product>();
export interface Products extends EntityState<Product> { }

export const storeAdapter = createEntityAdapter<Store>();
export interface Stores extends EntityState<Store> { }

export const bankAdapter = createEntityAdapter<Bank>();
export interface Banks extends EntityState<Bank> { }

const defaultProduct = {
  product: null,
};
const defaultStore = {
  store: null,
};

const defaultBank = {
  store: [],
};



export const initialStateProduct: Product = productAdapter.getInitialState(defaultProduct);
export const initialStateStore: Stores = storeAdapter.getInitialState(defaultStore);
export const initialStateBank: Banks = bankAdapter.getInitialState(defaultProduct);

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

export const getProductState = createFeatureSelector<Products>('product');
export const getStoreState = createFeatureSelector<Stores>('store');
export const getBankState = createFeatureSelector<Banks>('bank');



