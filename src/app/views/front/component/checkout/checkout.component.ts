import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  statusAddBilling: Boolean = false;
  constructor() { }

  ngOnInit() {
    // this.addBilling();
  }

  addBilling(data) {

    if (data === 'add') {
      this.statusAddBilling = true;
    } else {
      this.statusAddBilling = false;
    }
  }
}
