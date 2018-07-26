import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../core/services/transaction/transaction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log('id:', params['i+d']);
    });
  }
  // getDetail(){
  //       this.transactionService.getInvoice(id).subscribe(respon => {
  //    console.log('apa ini', respon);
  //   });
  // }
}
