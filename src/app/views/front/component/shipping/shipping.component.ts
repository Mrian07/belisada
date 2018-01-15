import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Shipping & Billing Address');
  }

  next() {
    this.router.navigateByUrl('/payment-method');
  }

  prev() {
    this.router.navigateByUrl('/cart');
  }

}
