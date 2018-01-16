import { PaymentMethod } from './../../../../core/model/PaymentMethod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethodService } from '../../../../core/service/payment-method/payment-method.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  paymentMethod: PaymentMethod[];

  constructor(private router: Router, private title: Title, private paymentMethodService: PaymentMethodService) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Payment Method');
    this.paymentMethodService.getPaymentMethod().subscribe(datas => {
      this.paymentMethod = datas;
    });
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    this.router.navigateByUrl('/confirm-order');
  }

}
