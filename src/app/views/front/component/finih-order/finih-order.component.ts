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
  items: any[];
  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Finish Order');
    window.scrollTo(0, 0);

    this.route.params.subscribe( params => {
      this.transactionId = params.id;

      this.transactionsService.finihOrder(params.id).subscribe(respon => {
        console.log(respon);
      });

      // console.log('ini test', params);
      // this.store.dispatch(new frontActions.GetDetail(this.productId));
    });
  }



}
