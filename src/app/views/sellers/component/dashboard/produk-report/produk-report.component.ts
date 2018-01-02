import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produk-report',
  templateUrl: './produk-report.component.html',
  styleUrls: ['./produk-report.component.scss']
})
export class ProdukReportComponent implements OnInit {
  veryfyProduct: number;
  rejectedProduct: number;
  sendProduct: number;
  sellProduct: number;
  pendingProduct: number;
  returnProduct: number;
  searchText: string;

  verify = [];
  rejected = [];
  send = [];
  sell = [];
  pending = [];
  return = [];
  productList = [];
  constructor() { }

  ngOnInit() {
    this.veryfyProduct = this.verify.length;
    this.rejectedProduct = this.rejected.length;
    this.sendProduct = this.send.length;
    this.sellProduct = this.sell.length;
    this.pendingProduct = this.pending.length;
    this.returnProduct = this.return.length;
  }

}
