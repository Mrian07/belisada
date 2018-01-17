import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-buyer',
  templateUrl: './wishlist-buyer.component.html',
  styleUrls: ['./wishlist-buyer.component.scss']
})
export class WishlistBuyerComponent implements OnInit {
  readonly: any;
  rating: any;
  constructor() { }

  ngOnInit() {
  }

}
