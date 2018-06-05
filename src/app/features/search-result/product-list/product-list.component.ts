import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterM } from '@belisada/core/models/filter/filter-m';
import { FilterSService } from '@belisada/core/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cat;
  brand;
  keys: string;
  testing: FilterM = new FilterM();
  userlist: any;
  userlistClass: any;
  userlistCourier: any;
  a;
  en;
  constructor(private activatedRoute: ActivatedRoute, private filterService: FilterSService) { }

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
  }

  public getUser() {
console.log(this.keys);
  }

}
