import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { NgxCarouselStore } from 'ngx-carousel/src/ngx-carousel/ngx-carousel.interface';

@Component({
  selector: 'app-m-front-slide-show',
  templateUrl: './m-front-slide-show.component.html',
  styleUrls: ['./m-front-slide-show.component.scss']
})
export class MFrontSlideShowComponent implements OnInit {

  randoms: number;
  constructor(public carouselBanner: NgxCarousel
  , private router: Router
  ) { }

  ngOnInit() {
    this.random();
    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    };
  }

  random() {
    const r = Math.random();
    this.randoms = r;
  }
  /* It will be triggered on every slide*/
  onmoveFn(data: NgxCarouselStore) {
    // console.log(data);
  }
  slideShow() {
    this.router.navigateByUrl('/mobile/m-slider-depan');
  }
  slideGadget() {
    this.router.navigateByUrl('/mobile/m-category/1000503/m-aksesoris-gadget');
  }
  beliDiSini() {
    this.router.navigateByUrl('/mobile/m-seller-center/m-why-choose-us');
  }
  beliIphone() {
    this.router.navigateByUrl('/mobile/m-search?q=iphone');
  }
  beliLcd() {
    this.router.navigateByUrl('/mobile/m-product-list?parent=3&id=1000732&ob=6');
  }
}


