import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/service/product/product.service';

@Component({
  selector: 'app-product-top-buyer',
  templateUrl: './product-top-buyer.component.html',
  styleUrls: ['./product-top-buyer.component.scss']
})
export class ProductTopBuyerComponent implements OnInit {

  productId: any;
  productData: any;
  allProduct: any;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
     this.productTop();
  }

  productTop() {
      this.route.params.subscribe( params => {
      this.productId = params.id;
      this.productService.ProductNew(this.productId).subscribe(datas => {
        this.productData = datas;
        this.allProduct = this.productData.productList;
      });
    });
  }

}
