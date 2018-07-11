import { ProductDetailList, MoreInformation } from '@belisada/core/models/product/product.model';
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
  moreInformation: MoreInformation = new MoreInformation();
  // currentPage: number;
  // pages: any = [];

  tabVal: any;
  activeSpesifikasi: boolean;
  activeDiskripsi: boolean;
  activeDiskusi: boolean;
  activeUlasan: boolean;

  imgIndex: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.active();
    this.loadData();
  }

  loadData() {
    this.active();
    this.activeSpesifikasi = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        console.log('Produk', res);
        this.productDetail = res.data;
        this.moreInformation = res.data.moreInformation;
        this.tabVal = this.productDetail.specification;
        this.imgIndex = this.moreInformation.storeImageUrl;
      });
    });
  }

  active() {
    this.activeSpesifikasi = false;
    this.activeDiskripsi = false;
    this.activeDiskusi = false;
    this.activeUlasan = false;
  }

  goStore(id) {
  }

  selectImg(img) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = this.productDetail.specification;
        this.imgIndex = img;
      });
    });
  }

  spesifikasi() {
    this.active();
    this.activeSpesifikasi = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = this.productDetail.specification;
      });
    });
  }

  deskripsi() {
    this.active();
    this.activeDiskripsi = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = this.productDetail.description;
      });
    });
  }

  diskusi() {
    this.active();
    this.activeDiskusi = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = 'Coming soon 1...';
      });
    });
  }

  ulasan() {
    this.active();
    this.activeUlasan = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = 'Coming soon 2...';
      });
    });
  }

}
