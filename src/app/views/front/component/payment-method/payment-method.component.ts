import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    this.router.navigateByUrl('/confirm-order');
  }

}
