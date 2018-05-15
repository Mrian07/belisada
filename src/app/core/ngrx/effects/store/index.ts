import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    .pipe(map((action: Action.GetProvince) => action.province))
    .pipe(switchMap((id) =>
      this.storeService.getProvince(id)
        .pipe(switchMap( (province: any) => {
        return [
          new Action.GetProvinceSuccess(province)
        ];
        }
      )))
    );
    @Effect()
    City$: Observable<any> = this.actions$.ofType(Action.GETCITY)
    .pipe(map((action: Action.GetCity) => action.city))
    .pipe(switchMap((id) =>
      this.storeService.getCity(id)
        .pipe(switchMap( (city: any) => {
        return [
          new Action.GetCitySuccess(city)
        ];
        }
      )))
    );
}
