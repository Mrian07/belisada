import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrderStatus: boolean;
  tabOrderHistory: boolean;
  constructor() { }

  ngOnInit() {
    this.statusTab();
    this.tabOrderStatus = true;
  }

  statusTab() {
    this.tabOrderStatus = false;
    this.tabOrderHistory = false;
  }

  orderStatus() {
    this.statusTab();
    this.tabOrderStatus = true;
  }

  orderHistory() {
    this.statusTab();
    this.tabOrderHistory = true;
  }

}
