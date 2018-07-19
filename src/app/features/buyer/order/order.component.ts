import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: string;
  constructor() { }

  ngOnInit() {
    this.tabOrder = 'tabStatus';
  }

  tab($data) {
    this.tabOrder = $data;
  }

}
