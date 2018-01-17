import { ProductSearchResault } from './../../../../core/model/product-search-resut';
import { PorductList } from './../../../../core/model/product-list';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SearchService } from '../../../../core/service/search/search.service';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { Store, ActionsSubject} from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchable;
  disabled;
  options;
  m_product_category_id;
  selectedOption;
  productSearchResault: ProductSearchResault = new ProductSearchResault();
  navigation;
  boundary;
  selectedPage;
  keys: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsSubject: ActionsSubject,
    private searchService: SearchService,
    private store: Store<fromProduct.Lists>,
    private ngZone: NgZone,
    private title: Title
  ) {
  //   this.router.routeReuseStrategy.shouldReuseRoute = function(){
  //     return false;
  //  };
   this.route.queryParams
      .subscribe(params => {
        this.keys = params.q;
        if (params.page) {
          this.currentPage = params.page;
        }
        this.store.dispatch(new frontActions.GetList(params));
        this.getDetailData = this.actionsSubject
        .asObservable()
        .filter(action => action.type === frontActions.GETLISTSUCCESS)
        .subscribe((action: frontActions.GetListSuccess) => {
         this.getDetailDatas();
        });
    });

  }

  currentPage = 1;
  lastPages: number;
  start = 0;
  end = 0;
  total = 0;
  limit = 10;
  pages: any = [];
  listStyleType = 'list-row';
  pageParams: any;
  getDetailData: Subscription;
  loading = true;
  pageTitle: string;

  ngOnInit() {
    if (this.keys === undefined) {
      this.title.setTitle('Belisada - Product List');
    } else {
      this.title.setTitle('Belisada - Search Result');
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.lastPages) { return false; }
    this.router.navigate(['/search'], { queryParams: { page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
  listStyle(sty: string) {
    this.listStyleType = sty;
  }

  getDetailDatas() {
    this.loading = true;
    this.ngZone.run(() => {
      this.store.select<any>(fromProduct.getListState).subscribe(response => {
        this.loading = false;
        this.productSearchResault = response;
        this.total = response.productCount;
        this.start = (this.currentPage - 1) * this.limit;
        this.end = this.start + this.limit;
        this.pages = [];
        if (this.end > this.total) {
          this.end = this.total;
        }
        this.lastPages = response.pageCount;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.lastPages) {
            this.pages.push(r);
          }
        }
      });
    });
  }

  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
}
