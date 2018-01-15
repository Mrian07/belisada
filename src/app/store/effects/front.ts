import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import * as fromActions from '../../store/actions';
import * as frontActions from '../../store/actions/front';
import { SellerProduct, Product } from '../../core/model/product';
import { AddproductService } from '../../core/service/addproduct/addproduct.service';
import { GetProduct } from '../../store/actions';
import { switchMap } from 'rxjs/operator/switchMap';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { HomeService } from '../../core/service/home/home.service';
import { ProductDetailService } from '../../core/service/product-detail/product-detail.service';
import { SearchService } from '../../core/service/search/search.service';
import { CategoryService } from '../../core/service/category/category.service';


@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private detailService: ProductDetailService,
    private searchService: SearchService,
    private categoryService: CategoryService,
) {}

  @Effect()
  gethome$: Observable<any> = this.actions$.ofType(frontActions.GETHOME)
      .map((action: frontActions.GetHome) => action)
      .mergeMap(() =>
        this.homeService.getProductBrand()
        .switchMap((data) =>
          this.homeService.getTopProductCategory()
          .switchMap( (success: any) => {
            const output = {
              home: success,
              brands: data
            };
            return [
              new frontActions.GetHomeSuccess(output)
            ];
          }
        )
      )
    );

  @Effect()
  getdetail$: Observable<any> = this.actions$.ofType(frontActions.GETDETAIL)
    .map((action: frontActions.GetDetail) => action.id)
      .mergeMap((id) =>
        this.detailService.getProductDetail(id)
        .switchMap((detail) =>
          this.detailService.getStore(detail.brandname)
          .map((stores: any) => {
            const detailData = {
              detail: detail,
              stores: stores
            };
            return  new frontActions.GetDetailSuccess(detailData) ;
        }
      )
    )
  );

  @Effect()
  getlist$: Observable<any> = this.actions$.ofType(frontActions.GETLIST)
  .map((action: frontActions.GetList) => action.params)
    .switchMap((params) =>
      this.searchService.productList(params)
      .map( (list) => {
        return new frontActions.GetListSuccess(list);
      }
    )
  );

  @Effect()
  getcategory$: Observable<any> = this.actions$.ofType(frontActions.GETCATEGORY)
  .map((action: frontActions.GetCategory) => action.params)
    .switchMap((params) =>
      this.categoryService.CategoryThree(params)
      .map( (list) => {
        return new frontActions.GetCategorySuccess(list);
      }
    )
  );
}
