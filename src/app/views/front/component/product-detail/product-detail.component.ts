import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

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
  constructor() { }

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
