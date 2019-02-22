import { TestingServicesService } from './../../../core/services/testService/testing-services.service';
import { ModelsComponent } from './../../../shared/components/models/models.component';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { UserData, Home, HomeContent, Brand, FlashSaleContent, FlashSaleExpiredData } from '@belisada/core/models';
import { StoreService, UserService, HomeSService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { CheckStoreRequest } from '@belisada/core/models/store/store.model';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { BannerService } from '@belisada/core/services/banner/banner.service';
import { BannerMainData, BannerData } from '@belisada/core/models/banner/banner.model';
import { BrandService } from '@belisada/core/services/brand/brand.service';
import mct from 'madrick-countdown-timer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    imageUrls = [
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
      'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg' ,
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg'
    ];

      @Input() sideBar: ModelsComponent;
      @Input() visible: boolean;
      @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public validationOnpopUpCreateStore: FormGroup;
  provinces: Province[];
  nameOwner: FormControl;
  serverMessage: String;
  fm: any = {};
  cities: City[];
  curentPostal: any;
  districts: District[];
  userData: UserData = new UserData();
  villages: Village[];
  isLogin: Boolean = false;
  nameChecking: Boolean = false;
  storeName: FormControl;
  pending_submit: Boolean = false;
  timer: any;
  ip: string;
  country: string;
  storeUrl: FormControl;
  regForm: boolean;
  regSuccess: boolean;

  banners: any[];
  productNew: Home[] = [];
  productPop: Home[] = [];
  productImageUrl;
  productStoreUrl;
  imageDummy;
  imageDmy;
  imageHeader;
  imageHeaderNya;
  lnght;
  imageUrlArray;
  showDialog;
  dataForPopUp;

  public brandImageUrl: string;

  public bannerMain: BannerMainData = new BannerMainData();
  public bannersLeft: BannerData[] = [];
  public bannersBottom: BannerData[] = [];
  public bannersPromoOne: BannerData = new BannerData;
  public bannersPromoTwo: BannerData = new BannerData;
  public bannerTop: BannerData = new BannerData;
  public homeContents: HomeContent[] = [];
  public brandHomeList: Brand[] = [];
  public flashSaleProducts: FlashSaleContent[] = [];
  public flashSaleExpired: FlashSaleExpiredData = new FlashSaleExpiredData();

  public Arr = Array;

  public countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, status: 0, message: '' };

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private userS: UserService,
    private router: Router,
    private _homeService: HomeSService,
    private _messageService: TestingServicesService,
    private _bannerService: BannerService,
    private _brandService: BrandService,
  ) {
    this.productImageUrl = environment.thumborUrl + 'unsafe/400x400/center/filters:fill(fff)/';
    this.brandImageUrl = environment.thumborUrl + 'unsafe/fit-in/1000x1000/center/filters:fill(fff)/';
    this.productStoreUrl = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
    this.imageHeader = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.imageDmy = environment.thumborUrl + 'unsafe/fit-in/150x150/center/filters:fill(fff)/';
    this.imageHeaderNya = 'http://cdn.belisada.id/imageproductbrand/7bb882a8-3c31-40bd-8356-4974a4ce0595.png';
    this.imageDummy = 'https://cdn.belisada.id/imageproductbrand/2ad61795-9903-4efe-a8a8-ffbdfe705d0c.jpeg';
    this._messageService.listen().subscribe((m: any) => {
      // console.log(m);
      this.onFilterClick(m);
    });

    this.banners = [
      {
        url: 'https://cdn.belisada.id/banner/slider1.png',
        title: '1'
      }, {
        url: 'https://cdn.belisada.id/banner/slider2.png',
        title: '2'
      }, {
        url: 'https://cdn.belisada.id/banner/slider3.png',
        title: '3'
      }
    ];
  }

  ngOnInit() {
    this.flagStatus();
    this.regForm = true;
    this.bukaPopUp();
    this.formData();
    this.userData = this.userS.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) {
      this.isLogin = true;
    }
    this._getDataForPop();
    // this._getBannerTop();
    this._getBannerMain();
    this._getBannerLeft();
    this._getBannerBottom();
    this._getBannerPromoOne();
    this._getBannerPromoTwo();
    this._getBrandHomeList();
    this._getFlashSale();
    this._getFlashSaleExpired();
  }

  // private _getBannerTop() {
  //   this._bannerService.getBannerTop().subscribe(response => {
  //     console.log('_getBannerTop: ', response);
  //     if (response.status === 1) this.bannerTop = response.data;
  //   });
  // }

  private _getBannerMain() {
    this._bannerService.getBannerMain().subscribe(response => {
      // console.log('_getBannerMain: ', response);
      if (response.status === 1) this.bannerMain = response.data;
      console.log(this.bannerMain);
    });
  }

  private _getBannerLeft() {
    this._bannerService.getBannerLeft().subscribe(response => {
      // console.log('_getBannerLeft: ', response);
      if (response.status === 1) this.bannersLeft = response.data;
    });
  }

  private _getBannerBottom() {
    this._bannerService.getBannerBottom().subscribe(response => {
      // console.log('_getBannerBottom: ', response);
      if (response.status === 1) this.bannersBottom = response.data;
    });
  }

  private _getBannerPromoOne() {
    this._bannerService.getBannerPromoOne().subscribe(response => {
      if (response.status === 1) this.bannersPromoOne = response.data;
    });
  }

  private _getBannerPromoTwo() {
    this._bannerService.getBannerPromoTwo().subscribe(response => {
      if (response.status === 1) this.bannersPromoTwo = response.data;
    });
  }

  private _getBrandHomeList() {
    this._brandService.getHomeBrandList().subscribe(response => {
      // console.log('response: ', response);
      this.brandHomeList = response.content;
    });
  }

  private _getFlashSale() {
    const queryParams = {
      itemperpage: 6,
      page: 1
    };
    this._homeService.getFlashSale(queryParams).subscribe(response => {
      // console.log('_getFlashSale: ', response);
      this.flashSaleProducts = response.content;
    });
  }

  private _getFlashSaleExpired() {
    this._homeService.getFlashSaleExpired().subscribe(response => {
      // console.log('_getFlashSaleExpired: ', response);
      if (response.status === 1) this.flashSaleExpired = response.data;

      mct.countdown(this.flashSaleExpired.expiredTime, (countdown) => {
        // countdown = {
        //   days, hours, minutes, seconds,
        //   status [0 -> expired / 1 -> counting],
        //   message ['EXPIRED' / 'COUNTING']
        // }
        this.countdown = countdown;
      }, { format: 'dhms' });
    });
  }

  private bukaPopUp() {
    this.dataForPopUp = sessionStorage.getItem('boolean');
    this.showDialog = this.showDialog = !this.showDialog;
  }

  private formData() {
    this.storeName = new FormControl(null, Validators.required);
    this.storeUrl = new FormControl(null, Validators.required);
    this.validationOnpopUpCreateStore = this.fb.group({
      nameOwner: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      storeUrl: this.storeUrl,
      //   address: new FormControl(null, Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
    });
  }

  alertOnInit() {
    alert('aaa');
  }
  gotoHome() {
    this.router.navigate(['/']);

  }
  goToStoreNol() {
    sessionStorage.setItem('boolean', 'true');
    this.showDialog = false;
    const data = sessionStorage.getItem('boolean');
    window.open(environment.baseUrlSeller + '/auth/sign-in', '_blank');
  }
  onFilterClick(event) {
    this.showDialog = false;
        sessionStorage.setItem('boolean', 'true');
    const data = sessionStorage.getItem('boolean');
    // console.log('Fire onFilterClick: ', event);
  }
  functionOnStore() {
      // console.log('asdasdsadasd');
  }

  private _getDataForPop() {
    this._homeService.getHomeNew().subscribe(res => {
      this.homeContents = res.content;
    });
  }

  flagStatus() {
  this.regForm = false;
  this.regSuccess = false;
  }

  testingform(form: NgForm) {
    // console.log(form);
  }
  onChanges() {
    this.storeName.valueChanges.subscribe(val => {
      clearTimeout(this.timer);
      if (val.length > 0) {
        this.timer = setTimeout(() => {
          this.nameChecking = true;
          this.checkStoreName();
        }, 500);
      }
    });
  }
  getProvince() {
    // Country ID harcoded to Indonesia
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }
  goStore(url) {
    this.router.navigate(['/' + url]);
  }


  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  goToDetail(id, name) {
    const r = this.encodeUrl(name);
    // console.log(r);
    // if (r === ' ') {
    //   this.router.navigate(['/product/product-detail/' + id + '/' + 'yourItem']);
    // } else {
      this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    // }

    window.scrollTo(0, 0);
  }

  getCity(id) {
    this.storeService.getCity(id).subscribe(data => {
      this.cities = data;
      // console.log('data city', data);
    });
  }
  getDistrict(id) {
    this.storeService.getDistrict(id).subscribe(data => {
      this.districts = data;
      // console.log('data district', data);
    });
  }

  getVillage(id) {
    this.storeService.getVillage(id).subscribe(data => {
      this.villages = data;
      const model = this.validationOnpopUpCreateStore.value;
      const a = this.validationOnpopUpCreateStore.value.villageId = id.district;
      // console.log('data vilages', data);
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  checkStoreName() {
    const check_data: CheckStoreRequest = new CheckStoreRequest;
    check_data.name = this.storeName.value;
    this.storeService.isExist(check_data).subscribe(rsl => {
      if (rsl.status !== 1) {
        this.storeName.setErrors({
          'server': true
        });
        this.serverMessage = rsl.message;
      }
      this.nameChecking = false;
      if (this.pending_submit) {
        this.onSent();
        this.pending_submit = false;
      }
    }, err => {
      this.nameChecking = false;
      this.storeName.setErrors({
        'server': true
      });
    //   this.serverMessage = 'opps, please try again';
    });
  }
  isFieldValid(field: string) {
    return !this.validationOnpopUpCreateStore.get(field).valid && this.validationOnpopUpCreateStore.get(field).touched;
  }
  onSent() {
    if (this.validationOnpopUpCreateStore.valid) {
      const model = this.validationOnpopUpCreateStore.value;

      this.userS.createFormGuest(model).subscribe(rsl => {
        if (rsl.status === 1) {
          //   swal(rsl.message);
          // swal('Pembuatan Toko Berhasil');
          // swal
          this.flagStatus();
          this.regSuccess = true;
        } else {
          swal(rsl.message);
        }
      });
    } else {
    //   swal('ops maaf ada kesalahan');
      this.validateAllFormFields(this.validationOnpopUpCreateStore);
    }
  }

  setVilage(villageId) {
    const postalId: string = this.villages.find(x => x.villageId === villageId).postal;
    this.validationOnpopUpCreateStore.patchValue({
      postal: postalId
    });
  }
  /*
  validasi jika tidak ingin menggunakan huruf only angka
  */
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onNameKeydown(event: any) {
  const pattern = /[a-zA-Z 0-9\+\- ]+/;

  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
  this.validationOnpopUpCreateStore.get('name').valueChanges.subscribe(val => {
    val = val.replace(/\s+/g, '_').toLowerCase();
    this.validationOnpopUpCreateStore.patchValue({
    storeUrl: val
    });
  });
  }


  ngOnDestroy() {
    sessionStorage.setItem('boolean', 'false');
    // console.log('asdsadsad');
  }


}
