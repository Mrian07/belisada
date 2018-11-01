import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '@belisada/core/services/product/product.service';
import * as productDetailsActions from '../actions/product-details.action';
import * as productDetailsPriceActions from '../actions/product-details-price.action';
import * as productDetailsStoreActions from '../actions/product-details-store.action';
import * as productDetailsVariantActions from '../actions/product-details-variant.action';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {

  constructor(
    private _actions$: Actions,
    private _productService: ProductService
  ) { }

  /**
   * Product details
   */
  @Effect()
  getProductDetails$: Observable<Action> = this._actions$.pipe(
    ofType(productDetailsActions.ActionTypes.LOAD),
    map((action: productDetailsActions.LoadAction) => action),
    switchMap(action => {
      return this._productService.getProductDetailV2(action.id, action.payload).pipe(
        map(product => new productDetailsActions.LoadSuccessAction(product)),
        catchError(error => of(new productDetailsActions.LoadFailAction()))
      );
    })
  );

  /**
   * Product details price
   */
  @Effect()
  getProductDetailsPrice$: Observable<Action> = this._actions$.pipe(
    ofType(productDetailsPriceActions.ActionTypes.LOAD),
    map((action: productDetailsPriceActions.LoadAction) => action),
    switchMap(action => {
      return this._productService.getProductDetailV2Price(action.id, action.payload).pipe(
        map(price => new productDetailsPriceActions.LoadSuccessAction(price)),
        catchError(error => of(new productDetailsPriceActions.LoadFailAction()))
      );
    })
  );

  /**
   * Product details store
   */
  @Effect()
  getProductDetailsStore$: Observable<Action> = this._actions$.pipe(
    ofType(productDetailsStoreActions.ActionTypes.LOAD),
    map((action: productDetailsStoreActions.LoadAction) => action),
    switchMap(action => {
      return this._productService.getProductDetailV2Store(action.id, action.payload).pipe(
        map(storeInfo => new productDetailsStoreActions.LoadSuccessAction(storeInfo)),
        catchError(error => of(new productDetailsStoreActions.LoadFailAction()))
      );
    })
  );

  /**
   * Product details variant
   */
  @Effect()
  getProductDetailsVariant$: Observable<Action> = this._actions$.pipe(
    ofType(productDetailsVariantActions.ActionTypes.LOAD),
    map((action: productDetailsVariantActions.LoadAction) => action.payload),
    switchMap(action => {
      return this._productService.getProductDetailV2Variant(action).pipe(
        map(variants => new productDetailsVariantActions.LoadSuccessAction(variants)),
        catchError(error => of(new productDetailsVariantActions.LoadFailAction()))
      );
    })
  );
}
