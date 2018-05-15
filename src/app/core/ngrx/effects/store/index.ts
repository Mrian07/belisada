import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Actions, Effect} from '@ngrx/effects';
import { StoreService, UserService } from '@belisada/core/services';
import * as Action from '../../actions';



@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService
) {}

    @Effect()
    Province$: Observable<any> = this.actions$.ofType(Action.GETPROVINCE)
    .map((action: Action.GetProvince) => action.province)
    .switchMap((id) =>
      this.storeService.getProvince(id)
        .switchMap( (province: any) => {
        return [
          new Action.GetProvinceSuccess(province)
        ];
        }
      )
    );
    @Effect()
    City$: Observable<any> = this.actions$.ofType(Action.GETCITY)
    .map((action: Action.GetCity) => action.city)
    .switchMap((id) =>
      this.storeService.getCity(id)
        .switchMap( (city: any) => {
        return [
          new Action.GetCitySuccess(city)
        ];
        }
      )
    );
}
