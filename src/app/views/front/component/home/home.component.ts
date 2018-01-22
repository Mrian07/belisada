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

    // const a = [1076071, 1071472, 1071480, 1071485, 1058306];
    // let z = 0;
  }

  loadHome() {
    this.store.select<any>(fromProduct.getHomeState).subscribe(data => {
      this.ngZone.run(() => {
        this.topHomeProductLvl1 = Observable.of(data.home);
        this.level_4 = Observable.of(data.brands);
        });
    });
  }
  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
}
