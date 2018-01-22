import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems;
  cart;
  paymentMethodDtos;
  paymentMethodId;
  shippingMethod;
  freightRates;
  deliveryTotal;
  freightRate;
  // deliveryTotal;
  itemsTotal;
  grossTotal;
  // shippingMethod;
  // freightRates;
  selectShippingMethod;

  constructor() { }

  ngOnInit() {
  }

}
