import { ActivatedRoute, Router } from '@angular/router';
import { TransactionListService } from './../../../../../core/service/transcations-list/transaction-list.service';
import { Component, OnInit } from '@angular/core';
import { TrasnactionList } from '../../../../../core/model/trasnaction-list';
import { RepiewServiceService } from '../../../../../core/service/repiew/repiew-service.service';
import { Store, ActionsSubject } from '@ngrx/store';
import * as fromProduct from '../../../../../store/reducers';
import * as frontActions from '../../../../../store/actions/front';
import { Subscription } from 'rxjs/Subscription';
import { ProductDetail } from '../../../../../core/model/product-detail';
@Component({
  selector: 'app-dalem-review',
  templateUrl: './dalem-review.component.html',
  styleUrls: ['./dalem-review.component.scss']
})
export class DalemReviewComponent implements OnInit {
  cart: TrasnactionList = new TrasnactionList();
  tsId: any;
  detailData: Subscription;
  title;
  kambing: ProductDetail = new ProductDetail();
  kampretLuh: string;
  review;
  star: number;
  aa: any[];
  getDetailProd: Subscription;
  aliasname;
  // kambing;
  constructor(private router: Router, private route: ActivatedRoute, private kampReviw: RepiewServiceService,
    private store: Store<fromProduct.Details>,
    private actionsSubject: ActionsSubject,
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.tsId = params.id;
      this.store.dispatch(new frontActions.GetDetail(this.tsId));
      // console.log(this.store.dispatch(new frontActions.GetDetail(this.tsId)));
      // console.log('pa', this.tsId);
      this.getDetailProd = this.actionsSubject
      .asObservable()
      .filter(action => action.type === frontActions.GETDETAILSSUCCESS)
      .subscribe((action: frontActions.GetDetailSuccess) => {
         this.kampret();
      });
      console.log('this' , params);
    });
  }
  kampret() {
    this.detailData = this.store.select<any>(fromProduct.getDetailState)
      .subscribe(data => {
        this.kambing = data.detail;
        // this.kampretLuh = data.detail.image[0];
        // console.log(this.kampretLuh);
      });
  }
  asd() {
    const data3 = {
      productId: this.tsId,
      title: this.title,
      review: this.review,
      star: this.star
    };
    console.log('kampretLuh', data3);
    this.kampReviw.createTapiPut(data3).subscribe(data => {
      console.log('berhasil cuy');
    });
    // console.log('asd', data3);
  }

}
