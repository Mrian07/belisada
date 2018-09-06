import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.tabOrder = 'tabStatus';
  }

  tab(data, tabOrder) {

    if (tabOrder === data) {
      this.tabOrder = data;
    } else {
      this.router.navigateByUrl('/buyer/order');
      this.tabOrder = data;
    }
  }

}
