import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-buyer',
  templateUrl: './transaction-buyer.component.html',
  styleUrls: ['./transaction-buyer.component.scss']
})
export class TransactionBuyerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  orderDetail() {
    this.router.navigate(['/buyer/order-detail-buyer']);
  }

}
