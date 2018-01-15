import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(private router: Router, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Confirm Order');
  }

  prev() {
    this.router.navigateByUrl('/payment-method');
  }

  finish() {
    this.router.navigateByUrl('/finish-order');
  }
}
