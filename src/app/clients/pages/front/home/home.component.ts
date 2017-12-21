import { TopProductLvl2 } from './../../../../servers/model/top-product-lvl2';
import { TopProductLvl1 } from './../../../../servers/model/top-product-lvl1';
import { TopProductCategory } from './../../../../servers/model/top-product-category';
import { HomeService } from './../../../../servers/service/home/home.service';
import { Level5 } from './../../../../servers/model/home/level5';
import { Level4 } from './../../../../servers/model/home/level4';
import { Level3 } from './../../../../servers/model/home/level3';
import { Level2 } from './../../../../servers/model/home/level2';
import { HomeView } from './../../../../servers/model/home.view';
import { Component, OnInit } from '@angular/core';
import { Level1 } from '../../../../servers/model/home/level1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeView: HomeView;
  level_1: Level1[];
  level_2: Level2[];
  level_3: Level3[];
  level_4: Level4[];
  level_5: Level5[];

  topProduct: TopProductCategory;
  topProductLvl1: TopProductLvl1[];
  topProductLvl2: TopProductLvl2[];

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

    this.homeService.getTopProductCategory().subscribe(data => {
      this.topProduct = data;
      this.topProductLvl1 = data.topProduct;
    });
  }

}
