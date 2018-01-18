import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TokenService } from '../../../../../core/service/token/token.service';
import * as fromActions from '../../../../../store/actions';
import * as fromProduct from '../../../../../store/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-produk-report',
  templateUrl: './produk-report.component.html',
  styleUrls: ['./produk-report.component.scss']
})
export class ProdukReportComponent implements OnInit {
  veryfyProduct: number;
  rejectedProduct: number;
  sendProduct: number;
  sellProduct: number;
  pendingProduct: number;
  returnProduct: number;
  searchText: string;
  verify = [];
  rejected = [];
  send = [];
  sell = [];
  pending = [];
  return = [];
  productList = [];
  storeId: number;
  sellerProduct: Observable<any>;

  constructor(
    private user: TokenService,
    private store: Store<fromProduct.Products>
  ) {
    const users = this.user.getUser();
   // this.storeId = users.stores[0].mBpartnerStoreId;
    //console.log(this.storeId);

   }

  ngOnInit() {
    this.veryfyProduct = this.verify.length;
    this.rejectedProduct = this.rejected.length;
    this.sendProduct = this.send.length;
    this.sellProduct = this.sell.length;
    this.pendingProduct = this.pending.length;
    this.returnProduct = this.return.length;
  }

}
