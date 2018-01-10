import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-buyer',
  templateUrl: './header-buyer.component.html',
  styleUrls: ['./header-buyer.component.scss']
})
export class HeaderBuyerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
     alert('ini namanya logout');
  }

}
