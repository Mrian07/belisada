import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FilterSService } from '@belisada/core/services';
import { FilterM, FilterCity } from '@belisada/core/models/filter/filter-m';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  cat;
  shippingOpt;
  brand;
  brandOPT;
  classificationOpt;
  categoryOPT: any;
  currentPage;
  keys: string;
  keyST: string;
  testing: FilterM = new FilterM();
  userlist: any;
  userCate: any;
  userlistClass: any;
  userlistCourier: any;
  a;
  en;
  leng;
  check;
  lengOnCity;
  myForm: FormGroup;

  jabode = '140,141,142,143,144,169,170,176,122,123,124,167,168'
  ;
  bandung12 = '164';

  surabaya = '259';

  medan = '582';

  yogya = '139';

  Ajne = 'jne';

  sma;

  city: FilterCity = new FilterCity();
  currentPgBrand: number;
  limitBrand: Number = 100;
  brandName: string;
  onCityFocus: Boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private filterService: FilterSService,
    private el: ElementRef,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.currentPgBrand = 1;
  this.getCityINit();
    this.dataLoad();
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
      tulisan: this.fb.array([]),
      kondisi: this.fb.array([]),
      city: this.fb.array([]),
      bandungF: this.fb.array([]),
      surabayaF: this.fb.array([]),
      medanF: this.fb.array([]),
      yogyaF: this.fb.array([]),
    });
  }

  private dataLoad() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.cat = params.location === undefined ? [] : params.location;
        this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
        this.categoryOPT = params.category === undefined ? [] :  params.category;
        this.shippingOpt = params.shipping === undefined ? [] : params.shipping;
        this.classificationOpt = params.classification === undefined ? [] : params.classification;
        this.keys = params.q;
        this.keyST = params.st;
        this.brandOPT = params.brand === undefined ? [] : params.brand;
        if (params.page) {
          // this.currentPage = params.page;
        }
        const paramFix = {
          q: params.q,
          st: params.st,
        };
        this.filterService.getFilter(paramFix).subscribe(user => {
          this.userlist = user;
          for (this.en of this.userlist) {
            this.a = this.en.filter;
            this.leng = this.userlist.length;
            const b = this.en;
            if (this.a === 'Category') {
              this.userCate = b.data;
            }
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
        });
      });
  }

  cCategory(e: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      location: this.cat,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand : this.brandOPT === undefined ? '' : this.brandOPT,
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.cat === undefined ? [] : this.cat,
      classification: this.classificationOpt,
      shipping: this.shippingOpt === undefined ? [] : this.shippingOpt,
      brand : this.brandOPT === undefined ? '' : this.brandOPT,
      category: e,
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    if (e == this.categoryOPT) {
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
    }
    if (this.keyST === 'store') {
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (e == this.categoryOPT) {
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
      }
    }
  }

  asd(e, isChecked: boolean) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      location: this.cat,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      category: this.categoryOPT
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.cat === undefined ? [] : this.cat,
      classification: this.classificationOpt,
      shipping: this.shippingOpt === undefined ? [] : this.shippingOpt,
      brand : e,
      category: this.categoryOPT
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    if (e === this.brandOPT) {
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
    }
    if (this.keyST === 'store') {
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (e === this.brandOPT) {
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
      }
    }
  }
  getFilId(e, isChecked: boolean) {
    const queryParams = {
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      q: this.keys === undefined ? '' : this.keys,
      st:  this.keyST,
      location : this.cat === undefined ? '' : this.cat,
      classification: e,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      location: this.cat,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.cat === undefined ? '' : this.cat,
      classification: e,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      category: this.categoryOPT
    };
    const emailFormArray2 = < FormArray > this.myForm.controls.kondisi;
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    if (isChecked) {
      emailFormArray2.push(new FormControl(e));
    } else {
      const index = emailFormArray2.controls.findIndex(x => x.value === e);
      emailFormArray2.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      e = isChecked;
    }

    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(e));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === e);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        e = isChecked;
      }
    }
  }

  getCityINit() {
    const queryParams = {
      page: this.currentPgBrand,
      itemperpage: this.limitBrand
    };
    this.filterService.getDataCity(queryParams).subscribe(response => {
      this.city = response;
    });
  }

  onBrandBlur() {
    setTimeout(() => { this.onCityFocus = false; }, 200);
  }

  onScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgBrand += 1,
      itemperpage: this.limitBrand,
      name: this.brandName === undefined ? '' : this.brandName
      };
      this.filterService.getDataCity(queryParams).subscribe(response => {
        this.city.data = this.city.data.concat(response.data);
      });
    }
  }

  searchBrand() {
    const qsBrand = this.brandName;
    const queryParams = {
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      name: qsBrand === undefined ? '' : qsBrand
    };
    this.filterService.getDataCity(queryParams).subscribe(response => {
      this.city = response;
      this.lengOnCity = response.dataCount;
    });
  }
  selectBrand(brand) {
    this.brandName = brand.cityName;
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : brand.cityId,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    if (this.keyST === 'store') {
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });

    }
  }

  jabod1e(jabodetabek, isChecked: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.jabode,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    const emailFormArray2 = < FormArray > this.myForm.controls.kondisi;
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    if (isChecked) {
      emailFormArray2.push(new FormControl(jabodetabek));
    } else {
      const index = emailFormArray2.controls.findIndex(x => x.value === jabodetabek);
      emailFormArray2.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      jabodetabek = isChecked;
    }

    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(jabodetabek));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === jabodetabek);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        jabodetabek = isChecked;
      }
    }
    // this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
  }

  bandung(bandun, isChecked: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const queryParams23 = {
    q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.bandung12,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    const emailFormArray3 = < FormArray > this.myForm.controls.bandungF;
    if (isChecked) {
      emailFormArray3.push(new FormControl(bandun));
    } else {
      const index = emailFormArray3.controls.findIndex(x => x.value === bandun);
      emailFormArray3.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      bandun = isChecked;
    }

    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(bandun));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === bandun);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        bandun = isChecked;
      }
    }

  }

  cSurabaya(sby, isChecked: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT,
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.surabaya,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    const emailFormArray4 = < FormArray > this.myForm.controls.surabayaF;
    if (isChecked) {
      emailFormArray4.push(new FormControl(sby));
    } else {
      const index = emailFormArray4.controls.findIndex(x => x.value === sby);
      emailFormArray4.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      sby = isChecked;
    }
    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(sby));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === sby);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        sby = isChecked;
      }
    }
  }
  cMedan(medan, isChecked: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.medan,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    if (this.userlistCourier.length === 0) {
    } else {
    }
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    const emailFormArray5 = < FormArray > this.myForm.controls.medanF;
    if (isChecked) {
      emailFormArray5.push(new FormControl(medan));
    } else {
      const index = emailFormArray5.controls.findIndex(x => x.value === medan);
      emailFormArray5.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      medan = isChecked;
    }

    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(medan));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === medan);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        medan = isChecked;
      }
    }
  }
  cJogja(yogya, isChecked: any) {
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      shipping: this.shippingOpt === undefined ? '' : this.shippingOpt,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
      location : this.yogya,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      shipping: this.shippingOpt,
      category: this.categoryOPT
    };
    if (this.userlistCourier.length === 0) {
    } else {
    }
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });
    const emailFormArray6 = < FormArray > this.myForm.controls.yogyaF;
    if (isChecked) {
      emailFormArray6.push(new FormControl(yogya));
    } else {
      const index = emailFormArray6.controls.findIndex(x => x.value === yogya);
      emailFormArray6.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      yogya = isChecked;
    }
    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(yogya));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === yogya);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        yogya = isChecked;
      }
    }

  }
  onChange(email: any, isChecked: boolean) {
    this.shippingOpt = email;
    const queryParams23 = {
      q: this.keys,
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      st:  this.keyST,
       shipping: email,
       location: this.cat,
       brand:   this.brandOPT === undefined ? '' : this.brandOPT,
       category: this.categoryOPT
    };
    const paramFix = {
      q: this.keys,
      st: this.keyST,
      location: this.cat,
      brand:   this.brandOPT === undefined ? '' : this.brandOPT,
      category: this.categoryOPT
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams23 });

    const emailFormArray = < FormArray > this.myForm.controls.useremail;
    if (isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      const index = emailFormArray.controls.findIndex(x => x.value === email);
      emailFormArray.removeAt(index);
      this.router.navigate(['/search-result/product-list'], { queryParams: paramFix });
      email = isChecked;
    }

    if (email === this.shippingOpt) {
       this.check = this.myForm.controls.value = email;
    }

    if (this.keyST === 'store') {
      const storeArray = < FormArray > this.myForm.controls.kondisi;
      this.router.navigate(['/search-result/store-list'], { queryParams: queryParams23 });
      if (isChecked) {
        storeArray.push(new FormControl(email));
      } else {
        const index = storeArray.controls.findIndex(x => x.value === email);
        storeArray.removeAt(index);
        this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
        email = isChecked;
      }
    }

  }


  ngOnDestroy() {
    this.dataLoad();
  }

  goToToko() {
    const paramFix = {
      q:  this.keys,
      st: 'store',
    };
    this.router.navigate(['/search-result/store-list'], { queryParams: paramFix });
  }

  goToProduct() {
    const paramFix3 = {
      q:  this.keys,
      st: 'product',
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: paramFix3 });
  }

}



