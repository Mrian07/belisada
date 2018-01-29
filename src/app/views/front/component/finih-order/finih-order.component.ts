import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../../../../core/service/transactions/transactions';

@Component({
  selector: 'app-finih-order',
  templateUrl: './finih-order.component.html',
  styleUrls: ['./finih-order.component.scss']
})

export class FinihOrderComponent implements OnInit {

  transactionId: any;
  name: string;
  paymentMethod: string;
  orderNumber: string;
  transactionStatus: string;
  billingName: string;
  billingAddress: string;
  shippingName: string;
  shippingAddress: string;
  courierName: string;
  courierAmt: number;
  grandTotal: number;
  itemsTotal: number = 0;

  items: any[];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Finish Order');
    window.scrollTo(0, 0);
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe( params => {
      this.transactionId = params.id;

      this.transactionsService.finihOrder(params.id).subscribe(respon => {
        console.log(respon);

        this.billingName = respon.billingName;
        this.billingAddress = respon.billingAddress;

        this.shippingName = respon.shippingName;
        this.shippingAddress = respon.shippingAddress;

        this.paymentMethod = respon.paymentMethod;
        this.courierName = respon.courierName;
        this.courierAmt = respon.courierAmt;

        this.grandTotal = respon.grandTotal;
        this.items = respon.items;
        console.log('ini produk',  this.items);
        respon.items.forEach(x => {
          this.itemsTotal += x.subtotal;
        });

      });

      // console.log('ini test', params);
      // this.store.dispatch(new frontActions.GetDetail(this.productId));
    });
  }



}
