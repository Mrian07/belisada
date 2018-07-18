import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: string;
  tabOrderStatus: boolean;
  tabOrderHistory: boolean;
  constructor() { }

  ngOnInit() {
    this.statusTab();
    this.tabOrder = 'tabStatus';
    this.tabOrderStatus = true;
  }

  statusTab() {
    this.tabOrderStatus = false;
    this.tabOrderHistory = false;
  }

  tab($data) {
    this.tabOrder = $data;
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
