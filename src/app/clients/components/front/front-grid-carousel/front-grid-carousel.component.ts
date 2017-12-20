import { HomeService } from './../../../../servers/service/home/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-grid-carousel',
  templateUrl: './front-grid-carousel.component.html',
  styleUrls: ['./front-grid-carousel.component.scss']
})
export class FrontGridCarouselComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAll().subscribe(datas => {
      console.log('datas: ', datas);
    });
  }

}
