import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../core/model/product';
import { ProductService } from '../../../../core/service/product/product.service';

@Component({
  selector: 'app-product-top-buyer',
  templateUrl: './product-top-buyer.component.html',
  styleUrls: ['./product-top-buyer.component.scss']
})
export class ProductTopBuyerComponent implements OnInit {

  productId: any;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }
  // constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     this.productTop();
  }

  productTop() {
      this.route.params.subscribe( params => {
      this.productId = params.id;
      console.log('this.productId: ', this.productId);
      this.productService.ProductNew(this.productId).subscribe(datas => {
        console.log(datas);
      });
    });
  }

}
