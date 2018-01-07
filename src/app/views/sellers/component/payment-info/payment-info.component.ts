import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Payment Info');
  }

}
