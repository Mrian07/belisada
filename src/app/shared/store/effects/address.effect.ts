import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as addressActions from '../actions/address.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AddressService } from '@belisada/core/services/address/address.service';

@Injectable()
export class AddressEffect {

  constructor(
    private _actions$: Actions,
    private _addressService: AddressService
  ) {}

  /**
   * Get shipping addresses
   */
  @Effect()
  getShippingAddress$: Observable<Action> = this._actions$.pipe(
    ofType(addressActions.ActionTypes.LOAD),
    map((action: addressActions.LoadAction) => action.payload),
    switchMap(state => {
      return this._addressService.getShipping().pipe(
        map(addresses => new addressActions.LoadSuccessAction(addresses)),
        catchError(error => of(new addressActions.LoadFailAction()))
      );
    })
  );
}
