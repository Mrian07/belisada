import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '../../../../core/service/store/store.service';
import { AddproductService } from '../../../../core/service/addproduct/addproduct.service';
import { SellerProduct, Product } from '../../../../core/model/product';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { TruncateModule } from 'ng2-truncate';
import swal from 'sweetalert2';
import { ShareService } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private storeService: StoreService, private productService: AddproductService,
  private routes: Router, private store: Store<fromProduct.Products>, private shared: ShareService
) { }

  storeId: number;
  sellerProduct: Observable<any>;
  totalItem: Observable<any>;

  ngOnInit() {
    this.getSellerStore();
    this.sellerProduct = this.store.select(fromProduct.getProductState);
    console.log(this.sellerProduct);
  }

  getSellerStore() {
    const user = JSON.parse(localStorage.user);
    const token = user.token;
    this.store.dispatch(new fromActions.GetStore(token));
    this.storeService.getAll().subscribe(response => {
      const storeId = response[0].mBpartnerStoreId;
      this.store.dispatch(new fromActions.GetProduct(storeId));
    });
  }

  addProducts() {
    this.routes.navigateByUrl('/seller/add-products/add');
  }

  editProducts(data) {
    this.shared.shareData = data;
    this.routes.navigateByUrl('/seller/add-products/edit');
  }
  search(event) {
    const key = event.target.value;
  }
}
