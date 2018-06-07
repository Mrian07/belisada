import { SearchService } from './../../../core/services/search/search.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterM } from '@belisada/core/models/filter/filter-m';
import { FilterSService } from '@belisada/core/services';
import { ListSearch } from '../../../core/models/search/search.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  list: ListSearch = new ListSearch();
  currentPage: number;
  lastPage: number;
  pages: any = [];

  sortUrut: string;
  sortName: string;

  cat;
  brand;
  keys: string;
  testing: FilterM = new FilterM();
  userlist: any;
  userlistClass: any;
  userlistCourier: any;
  a;
  en;
  constructor(private activatedRoute: ActivatedRoute,
    private filterService: FilterSService,
    private router: Router,
    private searchService: SearchService,
  ) { }

  ngOnInit() {

    this.getUser();
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.cat = params.cat === undefined ? [] : params.cat.substr(1).slice(0, -1).split(',');
        this.brand = params.brand === undefined ? [] : params.brand.substr(1).slice(0, -1).split(',');
        this.keys = params.q;
        if (params.page) {
          // this.currentPage = params.page;
        }
        const paramFix = {
          q: params.q,
          st: 'product'
        };
        this.filterService.getFilter(paramFix).subscribe(
          user => {
            this.userlist = user;
            for (this.en of  this.userlist) {
              this.a = this.en.filter;
              const b = this.en;
              if (this.a === 'Brand') {
                this.userlist = b.data;
              }
              if (this.a === 'Classification') {
                this.userlistClass = b.data;
              }
              if (this.a === 'Courier') {
                this.userlistCourier = b.data;
              }
          }
          },
        );

    });

    this.loadData();
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

      const queryParams = {
        st: 'product',
        q: params.q,
        page: this.currentPage,
        itemperpage: 10,
        ob: this.sortName,
        ot: this.sortUrut,
      }

      this.searchService.getList(queryParams).subscribe(response => {

        console.log('hasil', response);

        this.list = response;
        this.lastPage = this.list.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.totalPages) {
            this.pages.push(r);
          }
        }
      });
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/search-result/product-list'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  public getUser() {
console.log(this.keys);
  }

}
