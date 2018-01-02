import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';
import { HomeView } from '../../../../core/model/home.view';
import { Level1 } from '../../../../core/model/home/level1';
import { Level2 } from '../../../../core/model/home/level2';
import { Level3 } from '../../../../core/model/home/level3';
import { Level4 } from '../../../../core/model/home/level4';
import { Level5 } from '../../../../core/model/home/level5';
import { HomeService } from '../../../../core/service/home/home.service';


@Component({
  selector: 'app-front-grid-carousel',
  templateUrl: './front-grid-carousel.component.html',
  styleUrls: ['./front-grid-carousel.component.scss']
})
export class FrontGridCarouselComponent implements OnInit {

  homeView: HomeView;
  level_1: Level1[];
  level_2: Level2[];
  level_3: Level3[];
  level_4: Level4[];
  level_5: Level5[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getHomeThumbnail().subscribe(data => {
      this.homeView = data;
      this.level_1 = data.level_1;
      this.level_2 = data.level_2;
      this.level_3 = data.level_3;
      this.level_4 = data.level_4;
      this.level_5 = data.level_5;
    });
  }
}
