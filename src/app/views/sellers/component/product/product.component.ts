import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import { StoreService } from '../../../../core/service/store/store.service';
import { AddproductService } from '../../../../core/service/addproduct/addproduct.service';
import { SellerProduct, Product } from '../../../../core/model/product';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { TruncateModule } from 'ng2-truncate';
import swal from 'sweetalert2';
import { ShareService } from '../../../../core/service/shared.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private productService: AddproductService,
    private routes: Router,
    private store: Store<fromProduct.Products>,
    private shared: ShareService,
    private ngZone: NgZone,
    private actionsSubject: ActionsSubject,
) { }

  storeId: number;
  check: Boolean;
  st: Boolean = true;
  sellerProduct: Observable<any>;
  totalItem: Observable<any>;
  queryString: any = '';
  status: any;
  editmode: Boolean;
  editedPrice: number;
  editProduct: Subscription;

  ngOnInit() {
    this.editmode = false;
    this.getSellerStore();
    this.getList();
    this.editProduct = this.actionsSubject
        .asObservable()
        .filter(action => action.type === fromActions.EDITPRODUCTSUCCESS)
        .subscribe((action: fromActions.EditProductSuccess) => {
          this.ngZone.run(() => { this.sellerProduct = Observable.of(action.success); console.log('edit Done!'); });
           swal(
                'Product berhasil di Perbarui!',
                'success'
              ).then((result) => {
              });
        });
  }

  getList() {
    this.storeService.getStatus().subscribe(data => {
      if ( data[0].statusCode === 'AP') {
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
        //console.log(datas);
        //this.sellerProduct = datas;
      });
    });
  }

  checks(i) {
    //console.log(i);
  }

  inactive (id: number) {
    console.log(id);
    const data = {
      isActive: 'N',
      productId: 31097
    };
    swal({
      title: 'Belisada.co.id',
      text: 'Anda yakin mau non aktifkan produk ini?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya'
    }).then((result) => {
      //console.log(result);
      if (result.value) {
        this.productService.Inactive(data).subscribe(res => {
          swal(
          'Non Aktifkan!',
          'success'
          );
        });
      }
    });
  }

  checkAll(z) {
    if (z === true) {
      this.st = false;
      this.check = true;
    }else if (z === false) {
      this.st = true;
      this.check = false;
    }
   // console.log(z);
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
    this.editmode = true;
    this.shared.shareData = data;
    this.routes.navigateByUrl('/seller/add-products/edit');
  }

  editPrice(data) {
    //console.log(data);
    this.editmode = false;
   // this.sellerProduct = new EmptyObservable();
    this.getList();
    const productData = {
      pricelist: data,
      // description: this.description,
      // productId: this.productId,
      // mBpartnerStoreId: this.storeId,
      // weight: this.weight,
      // dimensionswidth: this.lebar,
      // dimensionslength: this.panjang,
      // dimensionsheight: this.tinggi,
      // specialPrice: this.specialPrice,
      // isAsapShipping: this.asap ,
      // tag: [this.productName],
      // qtyOnSeller: this.stok,
      // qtyOnHand: +this.qtyOnHand,
      // classification: this.classification,
      // isGuarantee: this.isGuarantee,
      // guaranteeDays: this.garansiDays
    };
    console.log(productData);
    //this.store.dispatch(new fromActions.EditProduct(productData));
  }

  search(event) {
    const key = event.target.value;
  }

  view(url: string, name: string) {
    swal({
      text: name,
      imageUrl: url,
      imageHeight: 400,
      imageAlt: 'Image'
    });
}
}
