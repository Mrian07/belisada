import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Actions, Effect} from '@ngrx/effects';
import { UserService } from '@belisada/core/services';
import * as Action from '../../actions';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private storeService: UserService
) {}

  @Effect()
    Login$: Observable<any> = this.actions$.ofType(Action.TRYLOGIN)
    .map((action: Action.Login) => action.status)
    .switchMap((req) =>
      this.storeService.signin(req)
      .switchMap( (status: any) => {
        return [
          new Action.LoginSuccess(status)
        ];
      }
    )
  );
  @Effect()
    Signup$: Observable<any> = this.actions$.ofType(Action.SIGNUPBUYER)
    .map((action: Action.SignUpBuyer) => action.status)
    .switchMap((req) =>
      this.storeService.signup(req)
        .switchMap( (status: any) => {
        return [
          new Action.SignUpBuyerSuccess(status)
        ];
      }
    )
  );
}
