import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import * as fromActions from '../../store/actions';
import { SellerProduct, Product } from '../../core/model/product';
import { AddproductService } from '../../core/service/addproduct/addproduct.service';
import { GetProduct } from '../../store/actions';
import { switchMap } from 'rxjs/operator/switchMap';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { StoreService } from '../../core/service/store/store.service';
import { MyStore } from '../../core/model/store';
import { RekeningSService } from '../../core/service/rekening/rekening-s.service';
import { Rekening } from '../../core/model/rekening';
@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private addProductService: AddproductService,
  private storeService: StoreService, private bankService: RekeningSService) {}
  @Effect()
  getproduct$: Observable<any> = this.actions$.ofType(fromActions.GETPRODUCT)
      .map((action: fromActions.GetProduct) => action.productid)
      .switchMap((productid) =>
        this.addProductService.GetSellerProduct(productid)
          .switchMap( (product: any) => {
            return [
              new fromActions.GetProductSuccess(product)
            ];
          }
        )
      );

  @Effect()
    addtproduct$: Observable<any> = this.actions$.ofType(fromActions.ADDPRODUCT)
    .map((payload: fromActions.AddProduct) => payload.product)
      .switchMap((product) =>
        this.addProductService.create(product)
        .map( (addproduct: Product) => new fromActions.AddProductSuccess(true))
            .catch(err => {
              alert(err['error']['error']['message']);
                return Observable.of(new fromActions.Failure({concern: 'ADDPRODUCT', error: err}));
              })
          );

  @Effect()
    editproduct$: Observable<any> = this.actions$.ofType(fromActions.EDITPRODUCT)
      .map((action: fromActions.EditProduct) => action.product)
        .switchMap((data) =>
          this.addProductService.update(data)
          .map( (editproduct: any) => new fromActions.EditProductSuccess(true))
        );

  @Effect()
    getbank$: Observable<any> = this.actions$.ofType(fromActions.GETBANK)
        .switchMap(() =>
          this.bankService.getAll()
            .switchMap( (bank: any) => {
              return [
                new fromActions.GetBankList(bank)
              ];
            })
          );

  @Effect()
    deletebank$: Observable<any> = this.actions$.ofType(fromActions.DELETEBANKLIST)
      .map((action: fromActions.DeleteBankList) => action.data)
      .switchMap((data) =>
        this.bankService.delete(data)
          .switchMap( (newdata: any) =>
            this.bankService.getAll()
            .switchMap( (bank: any) => {
              return [
                new fromActions.DeleteBankSuccess(bank)
              ];
            }
          )
        )
      );

  @Effect()
    addbank$: Observable<any> = this.actions$.ofType(fromActions.ADDBANK)
      .map((action: fromActions.AddBank) => action.data)
        .switchMap((data) =>
          this.bankService.create(data.data)
            .switchMap( (newdata: any) =>
              this.bankService.getAll()
              .switchMap( (bank: any) => {
                return [
                  new fromActions.AddBankSuccess(bank)
                ];
              }
            )
          )
        );

  @Effect()
    editbank$: Observable<any> = this.actions$.ofType(fromActions.EDITBANK)
      .map((action: fromActions.EditBank) => action.data)
        .switchMap((data) =>
          this.bankService.update(data.data)
            .switchMap( (newdata: any) =>
            this.bankService.getAll()
              .switchMap( (bank: any) => {
                return [
                  new fromActions.EditBankSuccess(bank)
                ];
              }
            )
          )
        );
}
