import { Store } from '@ngrx/store';
import * as store from '../../shared/store';
import * as productDetailsActions from '../../shared/store/actions/product-details.action';
import * as productDetailsActionsPrice from '../../shared/store/actions/product-details-price.action';
import * as productDetailsActionsStore from '../../shared/store/actions/product-details-store.action';
import * as productDetailsActionsVariant from '../../shared/store/actions/product-details-variant.action';
import * as addressActions from '../../shared/store/actions/address.action';
import * as shippingMethodActions from '../../shared/store/actions/shipping-method.action';

import { Injectable } from '@angular/core';
import { ProductDetailV2 } from '@belisada/core/models';

@Injectable()
export class ProductsSandbox {

  public productDetails$                = this.appState$.select(store.getProductDetailsData);
  public productDetailsLoading$         = this.appState$.select(store.getProductDetailsLoading);

  public productDetailsPrice$           = this.appState$.select(store.getProductDetailsPriceData);
  public productDetailsPriceLoading$    = this.appState$.select(store.getProductDetailsPriceLoading);

  public productDetailsStore$           = this.appState$.select(store.getProductDetailsStoreData);
  public productDetailsStoreLoading$    = this.appState$.select(store.getProductDetailsStoreLoading);

  public productDetailsVariant$         = this.appState$.select(store.getProductDetailsVariantData);
  public productDetailsVariantLoading$  = this.appState$.select(store.getProductDetailsVariantLoading);

  public shippingAddress$               = this.appState$.select(store.getAddressData);
  public shippingAddressLoading$        = this.appState$.select(store.getAddressLoading);

  public shippingMethod$                = this.appState$.select(store.getShippingMethodData);
  public shippingMethodLoading$         = this.appState$.select(store.getShippingMethodLoading);

  constructor(
    protected appState$: Store<store.State>
  ) { }

  /**
   * Loads product details from the server
   */
  public loadProductDetails(id: number, queryParams?: any): void {
    this.appState$.dispatch(new productDetailsActions.LoadAction(id, queryParams));
  }

  /**
   * Loads product details price from the server
   */
  public loadProductDetailsPrice(id: number, queryParams?: any): void {
    this.appState$.dispatch(new productDetailsActionsPrice.LoadAction(id, queryParams));
  }

  /**
   * Loads product details store from the server
   */
  public loadProductDetailsStore(id: number, queryParams?: any): void {
    this.appState$.dispatch(new productDetailsActionsStore.LoadAction(id, queryParams));
  }

  /**
   * Loads product details store from the server
   */
  public loadProductDetailsVariant(id: number): void {
    this.appState$.dispatch(new productDetailsActionsVariant.LoadAction(id));
  }

  /**
   * Loads shipping address from the server
   */
  public loadShippingAddress(): void {
    this.appState$.dispatch(new addressActions.LoadAction());
  }

  /**
   * Loads shipping method from the server
   */
  public loadShippingMethod(queryParams): void {
    this.appState$.dispatch(new shippingMethodActions.LoadAction(queryParams));
  }

  /**
   * Dispatches an action to select product details
   */
  public selectProduct(product: ProductDetailV2): void {
    this.appState$.dispatch(new productDetailsActions.LoadSuccessAction(product));
  }
}
