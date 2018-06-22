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
  shippingOpt;
  brand;
  brandOPT;
  classificationOpt;
  keys: string;
  keyST: string;
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

    this.loadData();
  }

  loadData() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      this.cat = params.location === undefined ? [] : params.location;
      this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
      this.classificationOpt = params.classification === undefined ? [] : params.classification;
      this.keys = params.q;
      this.keyST = params.st;
      this.brandOPT = params.brand === undefined ? [] : params.brand;

      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        ob: this.sortName,
        ot: this.sortUrut,
        q: params.q,
        st: params.st,
        location: this.cat,
        shipping: this.shippingOpt,
        classification: this.classificationOpt,
        brand: this.brandOPT
      };

      this.searchService.getList(queryParams).subscribe(response => {
        console.log('kokokoko');
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
