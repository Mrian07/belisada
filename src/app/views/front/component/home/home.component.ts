import { Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Product } from '../../../../core/model/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  level_4: Observable<Level4[]>;
  topHomeProductLvl1: Observable<TopProductCategory[]>;
  homeload: Subscription;
  productId;
  imgUrl;
  aliasName;
  // isDimmed: boolean = false;

  constructor(
    private homeService: HomeService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.Homes>,
    private title: Title,
    private seo: SeoService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.store.dispatch(new frontActions.GetHome());
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
    this.title.setTitle('Belisada - Home');

    this.homeload = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GETHOMESUCCESS)
    .subscribe((action: frontActions.GetHomeSuccess) => {
      this.loadHome();
    });
  }

  loadHome() {
    this.store.select<any>(fromProduct.getHomeState).subscribe(data => {
      this.ngZone.run(() => {
        const tempData: TopProductCategory[] = data.home;
        if (tempData) {
          tempData.forEach((x, i) => {
            if (window.matchMedia('(min-width: 425px)').matches) {
              tempData[i].imageUrl2 = x.imageUrl2;
            } else {
              tempData[i].imageUrl2 = x.imageUrl5;
            }
          });
          this.topHomeProductLvl1 = Observable.of(tempData);
        } else {
          this.topHomeProductLvl1 = Observable.of(data.home);
        }
        this.level_4 = Observable.of(data.brands);
        });
        //window.scrollTo(0, 0);
    });
  }
  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
  cate(id: number, name: string) {
    this.router.navigateByUrl('/category/' + id + '/' + name);
  }

  // ini() {
  //   this.store.select<any>(fromProduct.getHomeState).subscribe(data => {
  //     this.ngZone.run(() => {
  //       this.topHomeProductLvl1 = Observable.of(data.home);
  //       console.log(' this.topHomeProductLvl1 ',  Observable.of(data.home[0].imageUrl5) );
  //       this.level_4 = Observable.of(data.brands);
  //       if (window.matchMedia('(min-width: 425px)').matches) {
  //         this.imgUrl = data.home.imageUrl2;
  //     } else {
  //         this.imgUrl = data.home.imageUrl5;
  //     }
  //       });
  //   });
  // }
  brand(q: any) {
    this.router.navigateByUrl('search?q=' + q);
  }
}

