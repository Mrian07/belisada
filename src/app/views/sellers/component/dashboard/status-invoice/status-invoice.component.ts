import { Component, OnInit, HostListener } from '@angular/core';
import { StoreService } from '../../../../../core/service/store/store.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../../core/model/product';
import { AddproductService } from '../../../../../core/service/addproduct/addproduct.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from '../../../../../core/service/token/token.service';

@Component({
  selector: 'app-status-invoice',
  templateUrl: './status-invoice.component.html',
  styleUrls: ['./status-invoice.component.scss']
})
export class StatusInvoiceComponent implements OnInit {
  productList: any;
  color: string;
  status: string;
  editmode: any;
  ind: any;
  hargabaru: any;
  qtybaru: any;

  constructor(
    private auth: TokenService,
    private sellers: AddproductService,
    private routes: Router
  ) { }

  ngOnInit() {
    this.getRev();
  }
    // 'DR','SEDANG DI REVIEW',1
  // 'PE','MOHON DIPERBAIKI',2
  // 'RV','REVIEW',5
  // 'RJ','REJECTED',3
  // 'AP','SUDAH TAYANG',4

  getRev() {
    const user = this.auth.getUser();
    if (user) {
      if (user.stores.length === 0) {
        return;
      }
      const storeId = user.stores[0].mBpartnerStoreId;
      console.log(storeId);
      this.sellers.GetReviewProduct(storeId).subscribe(data => {
        console.log(data);
        this.productList = data.productList;
      });
    }
  }
  toEdit(i) {
    this.editmode = true;
    this.ind = i;
  }

  toBlur(list, i) {
    console.log(list);
    if (this.hargabaru === undefined) {
      this.hargabaru = list.pricelist;
    }
    if (this.qtybaru === undefined) {
     this.qtybaru = list.qtyOnSeller;
    }
    this.editmode = false;
    this.productList[i].pricelist = this.hargabaru;
    this.productList[i].stock = this.qtybaru;
    const editData = {
      qtyOnSeller: this.qtybaru,
      pricelist: this.hargabaru,
      productId: list.productId,
    };
    this.sellers.UpdatePrice(editData).subscribe(data => {
      console.log(data);
      this.editmode = false;
    });
  }

  inactive (id: number) {
    const data = {
      isActive: 'N',
      productId: id
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
      this.productList = [];
      if (result.value) {
        this.sellers.Inactive(data).subscribe(res => {
          console.log(res);
          this.getRev();
          swal(
          'Non Aktifkan!',
          'success'
          );
        });
      }
    });
  }

  active (id: number) {
    console.log(id);
    const data = {
      isActive: 'Y',
      productId: id
    };
    swal({
      title: 'Belisada.co.id',
      text: 'Anda yakin mau aktifkan produk ini?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya'
    }).then((result) => {
      console.log(result);
      this.productList = [];
      if (result.value) {
        this.sellers.Inactive(data).subscribe(res => {
          console.log(res);
          this.getRev();
          swal(
          'Aktifkan!',
          'success'
          );
        });
      }
    });
  }

  getQr(id: number) {
    this.sellers.GetQr(id).subscribe(data => {
      console.log(data);
      swal({
        imageUrl: data.image_url,
        imageHeight: 400,
        imageAlt: 'QR Code'
      });
    });
  }

  view(url: string) {
      swal({
        imageUrl: url,
        imageHeight: 400,
        imageAlt: 'Image'
      });
  }

  detail(id: number, alias: string) {
    this.routes.navigateByUrl('Product-detail/' + id + '/' + alias);
  }

}
