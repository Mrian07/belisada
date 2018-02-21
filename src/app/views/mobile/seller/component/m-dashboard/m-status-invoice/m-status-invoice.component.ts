import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-status-invoice',
  templateUrl: './m-status-invoice.component.html',
  styleUrls: ['./m-status-invoice.component.scss']
})
export class MStatusInvoiceComponent implements OnInit {
  productList = [
    {
      'name': 'name',
      'email': 'email'
    },
    {
      'name': 'name1',
      'email': 'email1'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
