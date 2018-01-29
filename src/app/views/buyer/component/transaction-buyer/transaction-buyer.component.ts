import { TransactionListService } from './../../../../core/service/transcations-list/transaction-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrasnactionList } from '../../../../core/model/trasnaction-list';

@Component({
  selector: 'app-transaction-buyer',
  templateUrl: './transaction-buyer.component.html',
  styleUrls: ['./transaction-buyer.component.scss']
})
export class TransactionBuyerComponent implements OnInit {
  ts: any[];
  aaa: TrasnactionList[];
  constructor(private router: Router, private tsBuyer: TransactionListService) { }

  ngOnInit() {
  this.narikDataDariBelakang();
  }


  orderDetail(id) {
    console.log('ini id yah', id.transactionId);
    this.router.navigate(['/buyer/order-detail-buyer', id.transactionId]);
  }
  narikDataDariBelakang() {
    this.tsBuyer.getAll().subscribe(data => {
      this.aaa = data;
      console.log('ah elah', data);
    });
  }

  orderConfirm(id) {
    console.log('ini id3 yah', id.transactionId);
    this.router.navigate(['/buyer/confirmation-buyer', id.transactionId]);
  }

}
