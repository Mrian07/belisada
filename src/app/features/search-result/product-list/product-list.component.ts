import { SearchService } from './../../../core/services/search/search.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterM } from '@belisada/core/models/filter/filter-m';
import { FilterSService } from '@belisada/core/services';
import { ListSearch, DataFilter, DataLocation } from '../../../core/models/search/search.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

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
  categoryOPT;
  category;
  classificationOpt;
  keys: string;
  keyST: string;
  testing: FilterM = new FilterM();
  userlist: any;
  userlistClass: any;
  userlistCourier: any;
  a;
  en;
  functionOnStore;
  produkIMG: any;

  listFilter: DataFilter[];

  curType = [];
  isTracking = false;

  currentLat: any;
  currentLong: any;
  zipCode: any;
  address: any;
  okeOce: any = [];

  listLocation: DataLocation[];
  getLocation: string;

  activeQueryParams: any;

  constructor(private activatedRoute: ActivatedRoute,
    private filterService: FilterSService,
    private router: Router,
    private searchService: SearchService,
    private http: HttpClient
  ) {
    this.produkIMG = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
  }

  ngOnInit() {
    // this.getUser();
    // this.filterSearch();
    // this.loadData();

    const queryParams = {
      postal: '52181',
    };

    this.searchService.getLocation(queryParams).subscribe(response => {
      this.listLocation = response.data;
    });

    // this.trackMe();

    this.activatedRoute.queryParams.subscribe((params: Params) => {



      console.log('this.curType: ', this.curType);
      console.log('params: ', params);
      this.activeQueryParams = Object.assign({}, params);

      this.filterSearch(params);
      this.loadData(params);
    });
  }

  filterSearch(params) {
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
      const queryParams = {
        q: params.q,
      };

      this.searchService.getSearchFilter(queryParams).subscribe(response => {
          this.listFilter = response[0].data;
          this.listFilter.forEach((item, index) => {
            this.curType.push('');
          });

          if (params.courier) {
            const couriers = params.courier.split(',');
            couriers.forEach(courier => {
              const index = this.listFilter.findIndex(x => x.type === courier);
              this.curType[index] = courier;
            });
          }
      });
    // });
  }

  selectLocation() {
    this.activeQueryParams['location'] = this.getLocation;
    // const newQueryParams = this.activeQueryParams;
    // newQueryParams['courier'] = this.curType.toString();
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  trackMe() {
    console.log('123123');
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + this.currentLat + ',' + this.currentLong +
        '&key=AIzaSyBfDG211qt5jJswzivewQ1wMNe-Uj6MCu0').
        subscribe((res) => {
          this.a = res;
          console.log(res);
          for (const b of this.a.results) {
            const m = b.types.includes('street_address');
            if (m) {
              this.address = b.formatted_address;
              console.log(b.formatted_address);
            }
              for(const d of b.address_components) {
                const n = d.types.includes('postal_code');
                if (n) {
                  this.zipCode = d.long_name;

                  const queryParams = {
                    postal: this.zipCode,
                  };

                  this.searchService.getLocation(queryParams).subscribe(response => {
                    console.log('hasil lokasi', response);
                  });

                  // this.http.get('https://api0.belisada.id/belisada/rates/v2?productId=2532&postal=' + this.zipCode).
                  // subscribe((kad) => {
                  //   this.okeOce = kad;
                  // });
                } else {
                  break;
                }
              }
            }
        });
  }

  changeCourier(type, checked, i) {
    if (checked) {
      this.curType[i] = type;
    } else {
      const index = this.curType.findIndex(x => x === type);
      if (index !== -1) { this.curType.splice(index, 1); }
    }
    this.activeQueryParams['courier'] = this.curType.toString();
    if (this.activeQueryParams.courier.includes('')) {
      this.activeQueryParams['courier'] = this.activeQueryParams['courier'].replace(/,/g, '');
    }
    // const newQueryParams = this.activeQueryParams;
    // newQueryParams['courier'] = this.curType.toString();
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   this.pages = [];
    //   this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
    //   this.cat = params.location === undefined ? [] : params.location;
    //   this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
    //   this.categoryOPT = params.category === undefined ? [] :  params.category;
    //   this.classificationOpt = params.classification === undefined ? [] : params.classification;
    //   this.keys = params.q;
    //   this.keyST = 'product';
    //   this.brandOPT = params.brand === undefined ? [] : params.brand;

    //   const queryParams = {
    //     page: this.currentPage,
    //     itemperpage: 10,
    //     ob: this.sortName,
    //     ot: this.sortUrut,
    //     q: params.q,
    //     st: params.st,
    //     location: this.cat,
    //     shipping: this.shippingOpt,
    //     classification: this.classificationOpt,
    //     brand: this.brandOPT,
    //     category: this.categoryOPT,
    //     couriertype: this.curType
    //   };

    //   this.searchService.getList(queryParams).subscribe(response => {
    //     this.list = response;
    //     console.log('apalah 222', response);
    //     this.lastPage = this.list.totalPages;
    //     for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
    //       if (r > 0 && r <= this.list.totalPages) {
    //         this.pages.push(r);
    //       }
    //     }
    //   });
    // });
  }


  loadData(params) {
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      this.cat = params.location === undefined ? [] : params.location;
      this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
      this.categoryOPT = params.category === undefined ? [] :  params.category;
      this.classificationOpt = params.classification === undefined ? [] : params.classification;
      this.keys = params.q;
      this.keyST = 'product';
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
        brand: this.brandOPT,
        category: this.categoryOPT
      };

      if (params.courier) queryParams['couriertype'] = params.courier;

      this.searchService.getList(queryParams).subscribe(response => {
        this.list = response;
        console.log('hasil data', response);
        this.lastPage = this.list.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.totalPages) {
            this.pages.push(r);
          }
        }
      });
    // });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/search-result/product-list'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  goDetail(id, name) {
    const r = name.replace(new RegExp('/', 'g'), ' ');
    this.router.navigate(['/product/product-detail/' + id + '/' + r]);
   window.scrollTo(0, 0);
  }

  public getUser() {
// console.log(this.keys);
  }

}
