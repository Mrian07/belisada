import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { NgxCarouselStore } from 'ngx-carousel/src/ngx-carousel/ngx-carousel.interface';

@Component({
  selector: 'app-front-slide-show',
  templateUrl: './front-slide-show.component.html',
  styleUrls: ['./front-slide-show.component.scss']
})
export class FrontSlideShowComponent implements OnInit {

  constructor(public carouselBanner: NgxCarousel) { }

  ngOnInit() {
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

  /* It will be triggered on every slide*/
  onmoveFn(data: NgxCarouselStore) {
    console.log(data);
  }

}

