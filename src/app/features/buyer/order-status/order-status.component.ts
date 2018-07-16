import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../core/services/transaction/transaction.service';
import { OrderStatus } from '@belisada/core/models/transaction/transaction.model';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  list: OrderStatus = new OrderStatus();
  listItem: any[];
  openDetail: boolean;
  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.openDetail = false;
    this.pendingOrder();
  }

  pendingOrder() {
    this.transactionService.getOrder().subscribe(respon => {
      console.log('detail order:', respon);
      this.list = respon;
      this.listItem = respon[0].transaction[0].cart;
     console.log('apa ini', this.listItem);
    });
  }

  openOS(status) {
    if (status === true) {
      this.openDetail = false;
    } else {
      this.openDetail = true;
    }

  }

}
