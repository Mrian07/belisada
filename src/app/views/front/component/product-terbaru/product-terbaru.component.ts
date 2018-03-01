import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/service/product/product.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-product-terbaru',
  templateUrl: './product-terbaru.component.html',
  styleUrls: ['./product-terbaru.component.scss']
})
export class ProductTerbaruComponent implements OnInit {

  productList: any[];
  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.allProduct();
  }

  allProduct() {
    this.productService.AllNewProduct().subscribe(response => {

      this.productList = response;
      // console.log('ini', this.productList);
    });
  }

  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }

}
