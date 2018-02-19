import { TransactionListService } from '../../../../../core/service/transcations-list/transaction-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrasnactionList } from '../../../../../core/model/trasnaction-list';

@Component({
  selector: 'app-m-transaction-buyer',
  templateUrl: './m-transaction-buyer.component.html',
  styleUrls: ['./m-transaction-buyer.component.scss']
})
export class MTransactionBuyerComponent implements OnInit {

  ts: any[];
  aaa: TrasnactionList[];
  constructor(private router: Router, private tsBuyer: TransactionListService) { }

  ngOnInit() {
  this.narikDataDariBelakang();
  }


  orderDetail(id) {
    this.router.navigate(['/buyer/order-detail-buyer', id.transactionId]);
  }
  narikDataDariBelakang() {
    this.tsBuyer.getAll().subscribe(data => {
      this.aaa = data;
    });
  }

  orderConfirm(id) {
    this.router.navigate(['/buyer/confirmation-buyer', id.transactionId]);
  }
  reviewBoss(id) {
    this.router.navigate(['/buyer/review-buyer', id.transactionId]);
  }

}
