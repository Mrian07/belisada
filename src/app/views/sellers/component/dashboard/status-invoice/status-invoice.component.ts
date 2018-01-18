import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../core/service/store/store.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../../../core/model/product';

@Component({
  selector: 'app-status-invoice',
  templateUrl: './status-invoice.component.html',
  styleUrls: ['./status-invoice.component.scss']
})
export class StatusInvoiceComponent implements OnInit {
  productList: Observable<Product[]>;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.getApproveProduct(4).subscribe(data => {
      console.log('approve', data);
      this.productList = Observable.of(data.productList);
    });
  }

}
