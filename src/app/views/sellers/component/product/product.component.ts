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
  hargabaru: any;
  ind: number;
  storeId: number;
  check: Boolean;
  st: Boolean = true;
  sellerProduct: Observable<any>;
  totalItem:  Observable<any>;
  queryString: any = '';
  status: any;
  editmode: Boolean;
  editedPrice: number;
  editProduct: Subscription;
  edits: any;
  product: any;

  ngOnInit() {
    this.editmode = false;
    this.getSellerStore();
    this.getList();
    this.editProduct = this.actionsSubject
        .asObservable()
        .filter(action => action.type === fromActions.EDITPRODUCTSUCCESS)
        .subscribe((action: fromActions.EditProductSuccess) => {
          this.ngZone.run(() => { this.sellerProduct = Observable.of(action.success); console.log('edit Done!', this.sellerProduct);
          swal(
            'Product berhasil di Perbarui!',
            'success'
          ).then((result) => {
           // location.reload();
           this.list();
            // console.log('this');
            //this.sellerProduct = this.store.select(fromProduct.getProductState);
          });
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
    this.list();
      this.store.select(fromProduct.getProductState).subscribe(datas => {
        console.log(datas);
      });
    });
  }

  list() {
    this.sellerProduct = this.store.select(fromProduct.getProductState);
  }

  checks(i) {

    ///console.log(i);

  }

  inactive (id: number) {
    //console.log(id);
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

  editProducts(data, index) {
    // this.editmode = true;
    // this.ind = index;
    // this.edits = true;
    // this.hargabaru = data.pricelist;
    this.shared.shareData = data;
    this.routes.navigateByUrl('/seller/add-products/edit');
  }

  editPrice(q) {
    this.editmode = false;
    //console.log(q);


   // this.sellerProduct = new EmptyObservable();

    const productData = {
      pricelist: this.hargabaru,
      productId: q.productId,
      mBpartnerStoreId: q.mBpartnerStoreId,
      weight: q.weight,
      dimensionswidth: q.dimensionswidth,
      dimensionslength: q.dimensionslength,
      dimensionsheight: q.dimensionsheight,
      specialPrice: q.specialPrice,
      isAsapShipping: q.isAsapShipping ,
      tag: [q.name],
      qtyOnSeller: q.qtyOnSeller,
      qtyOnHand: +q.qtyOnHand,
      classification: q.conditionCode,
      isGuarantee: q.isGuarantee,
      guaranteeDays: q.guaranteeDays
    };
    //console.log(productData);
    this.store.dispatch(new fromActions.EditProduct(productData));
    this.sellerProduct = new EmptyObservable();
    // "qtyOnSeller":37,
    // "pricelist":6000000,
    // "productId":31173
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
