import * as fromProductDetails from './reducers/product-details.reducer';
import * as fromProductDetailsPrice from './reducers/product-details-price.reducer';
import * as fromProductDetailsStore from './reducers/product-details-store.reducer';
import * as fromProductDetailsVariant from './reducers/product-details-variant.reducer';
import * as fromAddress from './reducers/address.reducer';
import * as fromShippingMethod from './reducers/shipping-method.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface State {
  productDetails: fromProductDetails.State;
  productDetailsPrice: fromProductDetailsPrice.State;
  productDetailsStore: fromProductDetailsStore.State;
  productDetailsVariant: fromProductDetailsVariant.State;
  address: fromAddress.State;
  shippingMethod: fromShippingMethod.State;
}

export const reducers: ActionReducerMap<State> = {
  productDetails: fromProductDetails.reducer,
  productDetailsPrice: fromProductDetailsPrice.reducer,
  productDetailsStore: fromProductDetailsStore.reducer,
  productDetailsVariant: fromProductDetailsVariant.reducer,
  address: fromAddress.reducer,
  shippingMethod: fromShippingMethod.reducer
};

/**
 *  # Product details store functions
 */
export const getProductDetailsState     = (state: State) => state.productDetails;
export const getProductDetailsLoaded    = createSelector(getProductDetailsState, fromProductDetails.getLoaded);
export const getProductDetailsLoading   = createSelector(getProductDetailsState, fromProductDetails.getLoading);
export const getProductDetailsFailed    = createSelector(getProductDetailsState, fromProductDetails.getFailed);
export const getProductDetailsData      = createSelector(getProductDetailsState, fromProductDetails.getData);

/**
 *  # Product details price store functions
 */
export const getProductDetailsPriceState    = (state: State) => state.productDetailsPrice;
export const getProductDetailsPriceLoaded   = createSelector(getProductDetailsPriceState, fromProductDetailsPrice.getLoaded);
export const getProductDetailsPriceLoading  = createSelector(getProductDetailsPriceState, fromProductDetailsPrice.getLoading);
export const getProductDetailsPriceFailed   = createSelector(getProductDetailsPriceState, fromProductDetailsPrice.getFailed);
export const getProductDetailsPriceData     = createSelector(getProductDetailsPriceState, fromProductDetailsPrice.getData);

/**
 *  # Product details store info store functions
 */
export const getProductDetailsStoreState    = (state: State) => state.productDetailsStore;
export const getProductDetailsStoreLoaded   = createSelector(getProductDetailsStoreState, fromProductDetailsStore.getLoaded);
export const getProductDetailsStoreLoading  = createSelector(getProductDetailsStoreState, fromProductDetailsStore.getLoading);
export const getProductDetailsStoreFailed   = createSelector(getProductDetailsStoreState, fromProductDetailsStore.getFailed);
export const getProductDetailsStoreData     = createSelector(getProductDetailsStoreState, fromProductDetailsStore.getData);

/**
 *  # Product details store info store functions
 */
export const getProductDetailsVariantState    = (state: State) => state.productDetailsVariant;
export const getProductDetailsVariantLoaded   = createSelector(getProductDetailsVariantState, fromProductDetailsVariant.getLoaded);
export const getProductDetailsVariantLoading  = createSelector(getProductDetailsVariantState, fromProductDetailsVariant.getLoading);
export const getProductDetailsVariantFailed   = createSelector(getProductDetailsVariantState, fromProductDetailsVariant.getFailed);
export const getProductDetailsVariantData     = createSelector(getProductDetailsVariantState, fromProductDetailsVariant.getData);

/**
 *  # Address store functions
 */
export const getAddressState    = (state: State) => state.address;
export const getAddressLoaded   = createSelector(getAddressState, fromAddress.getLoaded);
export const getAddressLoading  = createSelector(getAddressState, fromAddress.getLoading);
export const getAddressFailed   = createSelector(getAddressState, fromAddress.getFailed);
export const getAddressData     = createSelector(getAddressState, fromAddress.getData);

/**
 *  # Shipping method store functions
 */
export const getShippingMethodState   = (state: State) => state.shippingMethod;
export const getShippingMethodLoaded  = createSelector(getShippingMethodState, fromShippingMethod.getLoaded);
export const getShippingMethodLoading = createSelector(getShippingMethodState, fromShippingMethod.getLoading);
export const getShippingMethodFailed  = createSelector(getShippingMethodState, fromShippingMethod.getFailed);
export const getShippingMethodData    = createSelector(getShippingMethodState, fromShippingMethod.getData);
