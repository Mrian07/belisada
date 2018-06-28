import { ProductDetailList } from '@belisada/core/models/product/product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../core/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // id: number;
  // name: string;

  productDetail: ProductDetailList = new ProductDetailList();
  currentPage: number;
  pages: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        console.log('hasil:', res);
      });
    });
  }

  goStore(id) {
    alert(id);
  }

}
