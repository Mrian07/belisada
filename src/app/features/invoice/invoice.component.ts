import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../core/services/transaction/transaction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InvoiceData } from '@belisada/core/models/transaction/transaction.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  info : InvoiceData[];
  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.transactionService.getInvoice(params['id']).subscribe(respon => {
        this.info = respon.data;
      });
    });
  }
  // getDetail(){
  //       this.transactionService.getInvoice(id).subscribe(respon => {
  //    console.log('apa ini', respon);
  //   });
  // }
}
