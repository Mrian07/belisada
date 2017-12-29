import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-invoice',
  templateUrl: './status-invoice.component.html',
  styleUrls: ['./status-invoice.component.scss']
})
export class StatusInvoiceComponent implements OnInit {
  productList = [];
  constructor() { }

  ngOnInit() {
    this.productList = [
      {
        'orderId': '#5765675655',
        'product': 'Asus ROG',
        'qty': '3',
        'status': 'success',
        'date': '2017-12-09'
      },
      {
        'orderId': '#5765675615',
        'product': 'Macbook pro 15"',
        'qty': '1',
        'status': 'success',
        'date': '2017-12-10'
      },
      {
        'orderId': '#5765675673',
        'product': 'iPhone X',
        'qty': '6',
        'status': 'pending',
        'date': '2017-12-20'
      }
    ];
  }

}
