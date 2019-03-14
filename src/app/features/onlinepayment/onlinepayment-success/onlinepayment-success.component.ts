import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CheckoutService } from '@belisada/core/services/checkout/checkout.service';
import { SuccessTransactionRes, SuccessTransactionData } from '@belisada/core/models/checkout/checkout-transaction';

@Component({
  selector: 'app-onlinepayment-success',
  templateUrl: './onlinepayment-success.component.html',
  styleUrls: ['./onlinepayment-success.component.scss']
})
export class OnlinepaymentSuccessComponent implements OnInit {

  successTransactionRes: SuccessTransactionRes = new SuccessTransactionRes();

  constructor(
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) {
    this.successTransactionRes.data = new SuccessTransactionData();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {

      this.checkoutService.getSuccessTransaction(params['order_id']).subscribe(response => {
        this.successTransactionRes = response;
        const arrD = response.data.expiredTime.split(' ')[0].split('/');
        const newDate = arrD[2] + '-' + arrD[1] + '-' + arrD[0];

      });
    });
  }

}
