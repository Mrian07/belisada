import { WishlistBuyerService } from './../../../../core/service/wishlist-buyer/wishlist-buyer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist-buyer',
  templateUrl: './wishlist-buyer.component.html',
  styleUrls: ['./wishlist-buyer.component.scss']
})
export class WishlistBuyerComponent implements OnInit {
  readonly: any;
  rating: any;
  dat: any[];
  constructor(private iniserviceyah: WishlistBuyerService) { }

  ngOnInit() {
    this.fils3();
    console.log('kapret');
  }
  fils3() {
    this.iniserviceyah.getAll().subscribe(data => {
      this.dat = data;
      console.log('ini apa sih ', data);
    });
  }

}
