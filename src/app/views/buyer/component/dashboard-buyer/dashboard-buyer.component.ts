import { WishlistBuyerService } from './../../../../core/service/wishlist-buyer/wishlist-buyer.service';
import { ProductService } from './../../../../core/service/product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.scss']
})
export class DashboardBuyerComponent implements OnInit {
  productList: any[];
  readonly: any;
  rating: any;
  dat: any[];
  po;
  id;
  constructor(private router: Router,
    private productService: ProductService, private iniserviceyah: WishlistBuyerService) { }

  ngOnInit() {
    this.allProduct();
    this.fils3();
  }
  fils3() {
    this.iniserviceyah.getAll().subscribe(data => {
      this.dat = data;
      console.log('ini apa sih ', data);
    });
  }
  allProduct() {
    this.productService.AllNewProduct().subscribe(response => {

      this.productList = response;
      console.log('ini', this.productList);
    });
  }
  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }

}
