import { Component, OnInit } from '@angular/core';
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

  constructor(
    private auth: TokenService,
    private sellers: AddproductService,
    private routes: Router
  ) { }

  ngOnInit() {
    const user = this.auth.getUser();
    if (user) {
      const storeId = user.stores[0].mBpartnerStoreId;
      this.sellers.GetReviewProduct(storeId).subscribe(data => {
        console.log(data);
        this.productList = data.productList;
      });
    }
  }

  getQr(id: number) {
    this.sellers.GetQr(id).subscribe(data => {
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
