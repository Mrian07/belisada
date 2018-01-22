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
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  constructor(private storeService: StoreService, private productService: AddproductService,
  private routes: Router, private store: Store<fromProduct.Products>, private shared: ShareService
) { }

  storeId: number;
  check: Boolean;
  st: Boolean = true;
  sellerProduct: Observable<any>;
  totalItem: Observable<any>;
  queryString: any = '';
  status: any;

  ngOnInit() {
    this.getSellerStore();
    this.storeService.getStatus().subscribe(data => {
      if ( data[0].statusCode === '4') {
        this.status = true;
      } else {
        this.status = false;
        swal(
          'Belisada.co.id',
          'Toko Anda belum diverifikasi!'
        ).then((result) => {
         this.routes.navigateByUrl('seller/dashboard');
        });
      }
      this.sellerProduct = this.store.select(fromProduct.getProductState);
      this.store.select(fromProduct.getProductState).subscribe(datas => {
        console.log(datas);
      });
    });
  }

  checks(i) {
    console.log(i);
  }

  checkAll(z) {
    if (z === true) {
      this.st = false;
      this.check = true;
    }else if (z === false) {
      this.st = true;
      this.check = false;
    }
    console.log(z);
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
  view(url: string) {
    swal({
      imageUrl: url,
      imageHeight: 400,
      imageAlt: 'Image'
    });
}
}
