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
import { Filter, FilterParams } from '../../../../core/model/filter';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  // directives: [MadrickAccordionComponent, MadrickAccordionGroupComponent]
})
export class ProductSearchComponent implements OnInit {
  searchable;
  disabled;
  options;
  isReadonly: boolean= false;
  m_product_category_id;
  selectedOption: any;
  productSearchResault: ProductSearchResault = new ProductSearchResault();
  sidebarFilters: Filter[] = new Array<Filter>();
  navigation;
  boundary;
  selectedPage;
  keys: string;
  sortOrder: any;
  Params: any;
  catId: number;
  someRange: number[] = [0, 0];
  filterParams: FilterParams = new FilterParams();
  rate: number;
  allRate: number;
  currentPage = 1;
  lastPages: number;
  start = 0;
  end = 0;
  total = 0;
  limit = 12;
  pages: any = [];
  listStyleType = 'list-grid';
  pageParams: any;
  getDetailData: Subscription;
  getSidebarFilter: Subscription;
  loading = true;
  pageTitle: string;
  cat;
  brand;
  parent;
  // priceMin;
  // priceMax;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionsSubject: ActionsSubject,
    private searchService: SearchService,
    private store: Store<fromProduct.Lists>,
    private storeFilter: Store<fromProduct.Filters>,
    private ngZone: NgZone,
    private title: Title
  ) {

    this.filterParams.cat = [];
    this.filterParams.brand = [];

    const sortOrder = [
      {sort: 'Paling Sesuai', ob: 6 },
      {sort: 'Terbaru', ob: 5},
      {sort: 'Termahal', ob: 4},
      {sort: 'Termurah', ob: 3},
      {sort: 'Z-A', ob: 2},
      {sort: 'A-Z', ob: 1},
    ];
    this.sortOrder = sortOrder;

    this.route.queryParams
      .subscribe(params => {
        this.cat = params.cat === undefined ? [] : params.cat.substr(1).slice(0, -1).split(',');
        this.brand = params.brand === undefined ? [] : params.brand.substr(1).slice(0, -1).split(',');
        console.log('this.cat: ', this.cat);
        console.log('this.brand: ', this.brand);
        this.keys = params.q;
        if (params.page) {
          this.currentPage = params.page;
        }

        this.parent = params.parent;
        this.catId = params.id;
        this.Params = params;

        const paramFix = {
          q: params.q,
          parent: params.parent,
          id: params.id,
          page: params.page,
          itemperpage: this.limit
        };
        this.store.dispatch(new frontActions.GetList(JSON.parse(JSON.stringify(paramFix))));
        this.storeFilter.dispatch(new frontActions.GetSidebarFilter(JSON.parse(JSON.stringify(paramFix))));

        this.getDetailData = this.actionsSubject
        .asObservable()
        .filter(action => action.type === frontActions.GETLISTSUCCESS)
        .subscribe((action: frontActions.GetListSuccess) => {
          console.log('this.getDetailData()');
          this.loading = false;
          this.getDetailDatas();
        });

        this.getSidebarFilter = this.actionsSubject
        .asObservable()
        .filter(action => action.type === frontActions.GET_SIDEBAR_FILTER_SUCCESS)
        .subscribe((action: frontActions.GetSidebarFilterSuccess) => {
          console.log('this.getSidebarFilter()');
          this.loading = false;
          this.getSidebarFilters();
        });
    });
  }

  ngOnInit() {

    if (this.keys === undefined) {
      this.title.setTitle('Belisada - Product List');
    } else {
      this.title.setTitle('Belisada - Search Result');
    }
  }

  sortThis(ob) {

    if (this.Params.q) {
      this.Params =  {
        parent : 3,
        id : this.catId,
        ob : ob,
        q: this.Params.q
      };
      this.router.navigate(['/search'], { queryParams: this.Params });
    }else {
      this.Params =  {
        parent : 3,
        id : this.catId,
        ob : ob
      };
      this.router.navigate(['/product-list'], { queryParams: this.Params });
    }
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
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
        console.log(response);
        this.loading = false;
        if (!isEmpty(response)) {
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
        }
      });
    });

    function isEmpty(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  }

  updateFilter(filterAlias, data) {
    console.log('filterAlias: ', filterAlias);
    console.log('data: ', data);
    // let filter = '';
    switch (filterAlias) {
      case 'Category':
        const catI = this.filterParams.cat.indexOf(data.valueId);
        if (catI > -1) {
          this.filterParams.cat.splice(catI, 1);
        } else {
          this.filterParams.cat.push(data.valueId);
        }
        break;

      case 'Brand':
        const brandI = this.filterParams.brand.indexOf(data.valueId);
        if (brandI > -1) {
          this.filterParams.brand.splice(brandI, 1);
        } else {
          this.filterParams.brand.push(data.valueId);
        }
        break;

      case 'Price':

        break;
      default:
        break;
    }

    this.generateFilterParams();
  }

  generateFilterParams() {
    let cat = '';
    let brand = '';

    this.filterParams.cat.forEach((x, index) => {
      cat += (index === 0) ? '(' : '';
      cat += x;
      cat += (index === this.filterParams.cat.length - 1) ? ')' : ',';
    });

    this.filterParams.brand.forEach((x, index) => {
      brand += (index === 0) ? '(' : '';
      brand += x;
      brand += (index === this.filterParams.brand.length - 1) ? ')' : ',';
    });

    this.Params = {
      q: this.keys,
      parent: this.parent,
      id: this.catId,
      from: (<HTMLInputElement>document.getElementById('priceMin')).value,
      to: (<HTMLInputElement>document.getElementById('priceMax')).value,
      cat: (this.filterParams.cat.length === 0) ? '()' : cat,
      brand: (this.filterParams.brand.length === 0) ? '()' : brand
    };
    console.log(this.Params);
    this.store.dispatch(new frontActions.GetList(JSON.parse(JSON.stringify(this.Params))));
    // this.storeFilter.dispatch(new frontActions.GetSidebarFilter(this.keys));

    this.getDetailData = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GETLISTSUCCESS)
    .subscribe((action: frontActions.GetListSuccess) => {
      console.log('this.getDetailData()');
      this.loading = false;
      this.getDetailDatas();
    });
    // this.router.navigate(['/product-list'], { queryParams: this.Params });
  }

  getSidebarFilters() {
    this.loading = true;
    this.ngZone.run(() => {
      this.store.select<any>(fromProduct.getFilterState).subscribe(response => {
        this.loading = false;
        if (!isEmpty(response)) {
          this.sidebarFilters = response;

          console.log('this.sidebarFilters', this.sidebarFilters);
          this.sidebarFilters.forEach(x => {
            if (x.filterAlias === 'Price') {
              x.data.forEach(item => {
                this.someRange = [item.min, item.max];
                // this.priceMin = item.min;
                // this.priceMax = item.max;
              });
            }
          });
        }
      });
    });

    function isEmpty(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  }

  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
}
