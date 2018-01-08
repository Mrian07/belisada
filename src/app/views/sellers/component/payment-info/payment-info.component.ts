import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActiveLink } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  constructor(private title: Title, private active: ActiveLink) { }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Payment Info');
  }

}
