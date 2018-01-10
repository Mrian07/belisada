import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeView } from '../../../../core/model/home.view';
import { Level1 } from '../../../../core/model/home/level1';
import { Level2 } from '../../../../core/model/home/level2';
import { Level3 } from '../../../../core/model/home/level3';
import { Level4 } from '../../../../core/model/home/level4';
import { Level5 } from '../../../../core/model/home/level5';
import { TopProductCategory } from '../../../../core/model/top-product-category';
import { TopProductLvl1 } from '../../../../core/model/top-product-lvl1';
import { TopProductLvl2 } from '../../../../core/model/top-product-lvl2';
import { HomeService } from '../../../../core/service/home/home.service';
import { SeoService } from '../../../../core/service/seo.service';


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
  topProductLvl1: TopProductCategory[];
  topProductLvl2: TopProductLvl2[];

  constructor(private homeService: HomeService, private title: Title, private seo: SeoService) {
  }

  ngOnInit() {
    this.title.setTitle('Belisada - Home');
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
    this.homeService.getHomeThumbnail().subscribe(data => {
      this.homeView = data;
      this.level_1 = data.level_1;
      this.level_2 = data.level_2;
      this.level_3 = data.level_3;
      // this.level_4 = data.level_4;
      this.level_5 = data.level_5;

      console.log(data);
    });

    this.homeService.getProductBrand().subscribe(data => {
      this.level_4 = data;
    });

    this.homeService.getTopProductCategory().subscribe(data => {
      // this.topProduct = data;
      this.topProductLvl1 = data;
    });
  }

}
