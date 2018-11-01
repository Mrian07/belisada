import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as shippingMethodActions from '../actions/shipping-method.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';

@Injectable()
export class ShippingMethodEffects {

  constructor(
    private _actions$: Actions,
    private _shoppingCartService: ShoppingCartService
  ) {}

  /**
   * Get shipping method
   */
  @Effect()
  getShippingMethod$: Observable<Action> = this._actions$.pipe(
    ofType(shippingMethodActions.ActionTypes.LOAD),
    map((action: shippingMethodActions.LoadAction) => action.payload),
    switchMap(state => {
      return this._shoppingCartService.getShippingRates(state).pipe(
        map(shippingMethods => new shippingMethodActions.LoadSuccessAction(shippingMethods)),
        catchError(error => of(new shippingMethodActions.LoadFailAction()))
      );
    })
  );
}
