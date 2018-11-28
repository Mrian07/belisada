import { SearchService } from './../../../core/services/search/search.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterM } from '@belisada/core/models/filter/filter-m';
import { FilterSService } from '@belisada/core/services';
import { ListSearch, DataFilter, DataLocation } from '../../../core/models/search/search.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

import { Options, LabelType } from 'ng5-slider';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  Arr = Array;

  minValue: Number = 0;
  maxValue: Number = 0;
  options: Options = new Options();

  valueRate: Number = 0;
  optionsRate: Options = {
    floor: 0,
    ceil: 5,
    showTicks: true,
    showSelectionBar: true,

    getSelectionBarColor: (valueRate: number): string => {
      return '#2AE02A';
    },

    getPointerColor: (value: number): string => {
      return '#2AE02A';
    },

    translate: (valueRate: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + valueRate;
        case LabelType.High:
          return '' + valueRate;
        default:
        // <i class="fas fa-star"></i>
          // return '<fa-icon [icon]="[fa, start]"></fa-icon>' + valueRate;
          return '' + valueRate;
      }
    }

  };


  ceil: any;

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
  getSortBy: string;
  activeQueryParams: any;

  min: number;
  max: number;

  listSort: any = ['name', 'brandname', 'rate', 'review', 'pricelist', 'discount', 'seen'];
  perPage: any = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  itemperpage: number;


  starDefault: number;
  starYellow: number;

  constructor(private activatedRoute: ActivatedRoute,
    private filterService: FilterSService,
    private router: Router,
    private searchService: SearchService,
    private http: HttpClient,
  ) {
    this.produkIMG = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
  }

  ngOnInit() {
    const queryParams = {
      postal: '52181',
    };


    this.searchService.getLocation(queryParams).subscribe(response => {
      this.listLocation = response.data;
    });

    // this.trackMe();

    this.filterSearch(this.activatedRoute.snapshot.queryParams);

    this.activatedRoute.queryParams.subscribe((params: Params) => {

      this.activeQueryParams = Object.assign({}, params);
      this.loadData(params);
    });
  }

  changePrice() {
    this.activeQueryParams['min'] = this.minValue;
    this.activeQueryParams['max'] = this.maxValue;

    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  changeRating() {
    this.activeQueryParams['rate'] = this.valueRate;

    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  filterSearch(params) {

      const queryParams = {
        q: params.q,
      };

      this.searchService.getSearchFilter(queryParams).subscribe(response => {
          this.listFilter = response[0].data;

          // min
          this.minValue = response[5].data[0].min;
          this.maxValue = response[5].data[0].max;
          this.options = {
            floor: 0,
            ceil: response[5].data[0].max,

            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b>Min:</b> Rp ' + value;
                case LabelType.High:
                  return '<b>Max:</b> Rp ' + value;
                default:
                  return 'Rp ' + value;
              }
            }
          };

          this.listFilter.forEach((item, index) => {
            this.curType.push('');
          });

          if (params.courier) {
            const couriers = params.courier.split(',');
            console.log('couriers: ', couriers);
            couriers.forEach(courier => {
              console.log('asdasdaosdaoskdasjdo amsd oaksmdoa sdaoisdao');
              const index = this.listFilter.findIndex(x => x.type === courier);
              console.log('this.curType[index]:', this.curType[index]);
              this.curType[index] = courier;
            });
            console.log('this.curType: ', this.curType);
          }
      });

  }

  selectLocation() {
    this.activeQueryParams['location'] = this.getLocation;
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  selectSortBy() {
    this.activeQueryParams['sortName'] = this.sortName;
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });
  }

  selectPerPage() {
    this.activeQueryParams['itemperpage'] = this.itemperpage;
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
              for (const d of b.address_components) {
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
    console.log('i: ', i);
    console.log('checked: ', checked);
    console.log('this.curType: ', this.curType);
    if (checked) {
      this.curType[i] = type;
    } else {
      // const index = this.curType.findIndex(x => x === type);
      // if (index !== -1) { this.curType.splice(index, 1); }
      this.curType[i] = '';
    }
    this.activeQueryParams['courier'] = this.curType.toString();
    console.log('testing', this.activeQueryParams['courier']);
    if (this.curType.includes('')) {
      this.activeQueryParams['courier'] = this.activeQueryParams['courier'].replace(/,/g, '');
    }
    // const newQueryParams = this.activeQueryParams;
    // newQueryParams['courier'] = this.curType.toString();
    console.log('this.activeQueryParams: ', this.activeQueryParams);
    this.router.navigate(['/search-result/product-list'], {
      queryParams: this.activeQueryParams
    });

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

      (params.itemperpage) ? this.itemperpage = params.itemperpage : this.itemperpage = 10;
      (params.sortName) ? this.sortName = params.sortName : this.sortName = 'name';

      const queryParams = {
        page: this.currentPage,
        itemperpage: this.itemperpage,
        ob: this.sortName,
        ot: this.sortUrut,
        q: params.q,
        st: params.st,
        location: this.cat,
        shipping: this.shippingOpt,
        classification: this.classificationOpt,
        brand: this.brandOPT,
        category: this.categoryOPT,
      };

      if (params.courier) queryParams['couriertype'] = params.courier;

      if (params.max) queryParams['max'] = params.max;
      if (params.min) queryParams['min'] = params.min;
      if (params.rate) queryParams['rate'] = params.rate;
      if (params.sortName) queryParams['sortName'] = params.sortName;

      if (params.sortName) this.sortName = params.sortName;
      if (this.cat) this.getLocation = this.cat;

      this.searchService.getList(queryParams).subscribe(response => {
        this.list = response;
        // console.log('apa', response.rate);
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
