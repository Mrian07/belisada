import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {Actions, Effect} from '@ngrx/effects';
import { UserService } from '@belisada/core/services';
import * as Action from '../../actions';
import swal from 'sweetalert2';



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
) {}

  @Effect()
    Login$: Observable<any> = this.actions$.ofType(Action.TRYLOGIN)
    .pipe(map((action: Action.Login) => action.status))
    .pipe(switchMap((req) =>
      this.userService.signin(req)
      .pipe(switchMap( (status: any) => {
        // console.log('status: ', status.);
        if (status.status === 0) {
          swal('warning', status.message);
          return [];
        } else {
          return [
            new Action.LoginSuccess(status)
          ];
        }
      }
    )))
  );
  @Effect()
    Signup$: Observable<any> = this.actions$.ofType(Action.SIGNUPBUYER)
    .pipe(map((action: Action.SignUpBuyer) => action.status))
    .pipe(switchMap((req) =>
      this.userService.signup(req)
        .pipe(switchMap( (status: any) => {
        return [
          new Action.SignUpBuyerSuccess(status)
        ];
      }
    )))
  );
}
