import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../core/service/store/store.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../../core/model/product';
import { AddproductService } from '../../../../../core/service/addproduct/addproduct.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-status-invoice',
  templateUrl: './status-invoice.component.html',
  styleUrls: ['./status-invoice.component.scss']
})
export class StatusInvoiceComponent implements OnInit {
  productList: any;

  constructor(
    private storeService: StoreService,
    private sellers: AddproductService
  ) { }

  ngOnInit() {
    this.sellers.GetReviewProduct(4).subscribe(data => {
      this.productList = data.productList;
    });
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

}
