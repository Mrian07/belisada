import { ProductDetailService } from './../../../../core/service/product-detail/product-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../../../core/model/product-detail';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  tabs: any;
  act_key: any;
  productId: any;
  specialPrice: 3;
  highlight;
  ProductList: ProductDetail = new ProductDetail();
  ProductImage: string;

  aliasName;
  constructor(private route: ActivatedRoute,
    private detailService: ProductDetailService,
    private title: Title
  ) { }

  ngOnInit() {
    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.carouselTile = {
          grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
          slide: 2,
          speed: 400,
          animation: 'lazy',
          point: {
            visible: true
          },
          load: 2,
          touch: true,
          easing: 'ease'
        };
        this.route.params.subscribe( params => {
          this.productId = params.id;
          this.detailService.getProductDetail(this.productId).subscribe(data => {
            this.ProductList = data;
            this.ProductImage = data.image[0];
            this.title.setTitle('Belisada - ' + data.name);
          });
        });

        window.scrollTo(0, 0);

  }
  public carouselTileLoad(evt: any) {
        const len = this.carouselTileItems.length;
        if (len <= 30) {
          for (let i = len; i < len + 10; i++) {
            this.carouselTileItems.push(i);
          }
        }

}
}
