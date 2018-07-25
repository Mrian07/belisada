import { Component, OnInit } from '@angular/core';
// import { TransactionService } from './../../../core/services/transaction/transaction.service';

@Component({
  // selector: 'bs-invoice',
  // template: `
  //   <bs-main-layout>
  //       <router-outlet></router-outlet>
  //   </bs-main-layout>
  // `
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.transactionService.getInvoice(id).subscribe(respon => {
    //  console.log('apa ini', respon);
    // });

  }

}
