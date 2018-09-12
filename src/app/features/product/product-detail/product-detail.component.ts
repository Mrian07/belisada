import { FormControl } from '@angular/forms';
import { Content } from './../../../core/models/product/product.model';
import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { ProductDetailList, MoreInformation, CreateDiscus } from '@belisada/core/models/product/product.model';
import { ProductService } from '@belisada/core/services/product/product.service';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { AddToCartRequest } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { UserService, AuthService, HomeSService } from '@belisada/core/services';
import swal from 'sweetalert2';
import { Home } from '@belisada/core/models';
import { AddressService } from '@belisada/core/services/address/address.service';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { ShareButtons } from '@ngx-share/core';
import { ThumborService } from '@belisada/core/services/thumbor/thumbor.service';
import { ThumborOptions } from '@belisada/core/services/thumbor/thumbor.options';
import { ThumborSizingEnum } from '@belisada/core/services/thumbor/thumbor.sizing.enum';
import { Configuration } from '@belisada/core/config';
import { environment } from '@env/environment';

const RESULT_KEY = makeStateKey<string>('result');

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  isLogin: Boolean = false;
  shippingRates: any;

  isSubHeaderShow: Boolean = false;

  shippingAddress: any;
  rates: ShippingRate[];

  productDetail: ProductDetailList = new ProductDetailList();
  moreInformation: MoreInformation = new MoreInformation();

  shippingAddressList: GetShippingResponse[];

  qty = 1;

  tabVal: any;
  activeSpesifikasi: boolean;
  activeDiskripsi: boolean;
  activeDiskusi: boolean;
  activeUlasan: boolean;
  showmore;

  title: String;
  list: any;
  startPage: number;
  paginationLimit: number;
  openDetail: boolean;
  idDisuci: number;
  boolDiscus: boolean;

  imgIndex: string;

  storeImageUrl: any;
  brandImageUrl: any;
  productImageUrl;
  productImageUrlNew;
  productImageItemLooping;
  productNewatProdDetail: Home[] = [];
  productDescription: any;
  productDiskusi: any;
  productUlasan: any;
  textAreaClick: boolean;
  discus: Content[];
  idDicus: number;
  messageString: FormControl;
  messageBottom: FormControl;
  oktest: CreateDiscus = new CreateDiscus();
  private isServer: boolean;
  public result;
  @HostListener('window:scroll', ['$event'])
    doSomething(event) {
      this.isSubHeaderShow = (window.pageYOffset > 450) ? true : false;
    }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private homeS: HomeSService,
    private shoppingCartService: ShoppingCartService,
    private addressService: AddressService,
    private thumborService: ThumborService,
    public share: ShareButtons,
    private configuration: Configuration,
    private titles: Title,
    private meta: Meta,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId

  ) {
    this.storeImageUrl = environment.thumborUrl + 'unsafe/fit-in/218x218/';
    this.productImageUrl = environment.thumborUrl + 'unsafe/fit-in/400x400/filters:fill(fff)/';
    this.productImageUrlNew = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.productImageItemLooping = environment.thumborUrl + 'unsafe/fit-in/80x80/center/filters:fill(fff)/';
    this.shippingAddressList = [];
    this.shippingRates = '';
    this.shippingAddress = '';
    this.showmore = 'true';
    this.isServer = isPlatformServer(platformId);

    this.list = [
      {name: 'Prashobh', age: '25'},
      {name: 'Abraham', age: '35'},
      {name: 'Anil', age: '40'},
      {name: 'Sam', age: '40'},
      {name: 'Philip', age: '40'},
      {name: 'Bal', age: '40'},
      {name: 'Anu', age: '20'},
      {name: 'Sam', age: '25'},
      {name: 'Rocky', age: '35'},
      {name: 'Major', age: '40'},
      {name: 'Kian', age: '40'},
      {name: 'Karan', age: '40'},
      {name: 'Bal', age: '40'},
      {name: 'Anu', age: '20'},
      {name: 'Prashobh', age: '25'},
      {name: 'Abraham', age: '35'},
      {name: 'Anil', age: '40'},
      {name: 'Sam', age: '40'},
      {name: 'Philip', age: '40'},
      {name: 'Bal', age: '40'},
      {name: 'Anu', age: '20'}
    ];
    this.startPage = 0;
    this.paginationLimit = 2;
    this.boolDiscus = true;
    this.messageString = new FormControl('');
    this.messageBottom = new FormControl('');

    if (this.imgIndex === undefined) {
      this.imgIndex = 'https://cdn.myacico.co.id/belisada_v2/No-image-found.jpg';
    }
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.isLogin = true;
    }
    // // console.log('shippingAddress: ', this.shippingAddress);
    this.active();
    this.loadData();
  }

  addressChange() {
    const queryParam = {
      productId: this.productDetail.productId,
      destinationId: this.shippingAddress.rajaOngkirId,
      weight: this.productDetail.weight
    };
    this.getShippingRates(queryParam);
  }

  loadData() {
    this.active();
    this.activeSpesifikasi = true;
    this.homeS.getHomeNew().subscribe(res => {
      this.productNewatProdDetail = res;
      // // console.log('ini res: ', res);
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getDiscus(params);

      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.moreInformation = res.data.moreInformation;
        // console.log('this.productDetail: ', this.productDetail);
        // Spec tab value
        this.tabVal = this.productDetail.specification;
        // Description tab value
        this.productDescription = this.productDetail.description;
        // Diskusi tab value
        this.productDiskusi = 'Comming soon';
        // Ulasan tab Value
        this.productUlasan = 'Comming soon';

        /// SEO
        // Title
        this.titles.setTitle('Belisada - ' + this.productDetail.name);
        // Set meta tags
        // Twitter
        // this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        // this.meta.updateTag({ name: 'twitter:site', content: 'Belisada.co.id' });
        // this.meta.updateTag({ name: 'twitter:title', content: this.productDetail.name });
        // this.meta.updateTag({ name: 'twitter:description', content: this.productDetail.name});
        // this.meta.updateTag({ name: 'twitter:image', content: this.productDetail.imageUrl[0] });
        // Facebook
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'Belisada' });
        this.meta.updateTag({ property: 'og:title', content: this.productDetail.name });
        this.meta.updateTag({ property: 'og:description', content:  this.productDetail.name + ', ' + this.productDetail.description });
        this.meta.updateTag({ property: 'og:image', content: this.productDetail.imageUrl[0] });
        this.meta.updateTag({ property: 'og:url', content: this.configuration.domainUrl + '/product/product-detail/' +
        this.productDetail.id + '/' + this.productDetail.name });
        ///
        console.log(this.productImageUrl + '' + this.productDetail.imageUrl[0]);
        const thumborOption: ThumborOptions = {
          width: 100,
          height: 100,
          fitting: ThumborSizingEnum.FIT_IN,
          filter: {
            fill: 'white'
          }
        };

        this.productDetail.couriers.forEach((item, index) => {
          this.productDetail.couriers[index].imageUrl = this.thumborService.process(item.imageUrl, thumborOption);
        });

        // console.log('this.productDetail.couriers--updated: ', this.productDetail.couriers);

        // // console.log('ini tabval', this.tabVal);
        this.imgIndex = this.productDetail.imageUrl[0];
        // console.log('this.imgIndex: ', this.imgIndex);

        if (this.isLogin) {
          this.listShipping();
        }
      });
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.moreInformation = res.data.moreInformation;
        // console.log('this.productDetail: ', this.productDetail);
        this.tabVal = this.productDetail.specification;

        const thumborOption: ThumborOptions = {
          width: 100,
          height: 100,
          fitting: ThumborSizingEnum.FIT_IN,
          filter: {
            fill: 'white'
          }
        };

        this.productDetail.couriers.forEach((item, index) => {
          this.productDetail.couriers[index].imageUrl = this.thumborService.process(item.imageUrl, thumborOption);
        });

        // console.log('this.productDetail.couriers--updated: ', this.productDetail.couriers);

        // // console.log('ini tabval', this.tabVal);
        this.imgIndex = this.productDetail.imageUrl[0];
        // console.log('this.imgIndex: ', this.imgIndex);

        if (this.isLogin) {
          this.listShipping();
        }
      });
    });
  }

  active() {
    this.activeSpesifikasi = false;
    this.activeDiskripsi = false;
    this.activeDiskusi = false;
    this.activeUlasan = false;
  }
    textAreaExpannded(e) {
        this.idDicus = e;
        console.log(e);
        this.messageString.reset();
        this.textAreaClick = true;
      }
      hideTextArea() {
        this.textAreaClick = false;
      }
  showMoreItems(status, e) {
      this.idDicus = e;
      this.paginationLimit = Number(this.paginationLimit) + 3;





  }
  showLessItems() {
    this.paginationLimit = Number(this.paginationLimit) - 3;
  }
  private getDiscus(params: Params) {
    this.productService.getDiscus(params['id']).subscribe(resDiscus => {
      this.discus = resDiscus.content;
      console.log('discus', this.discus);
    });
  }

  goStore(url) {
    this.router.navigate(['/' + url]);
    // // console.log(url);
  }

  selectImg(img) {
    this.imgIndex = img;
  }

  listShipping() {
    this.addressService.getShipping().subscribe(respon => {
      this.shippingAddressList = respon;
      if (respon.length > 0) {
        this.shippingAddress = respon[0];
        const queryParam = {
          productId: this.productDetail.productId,
          destinationId: this.shippingAddress.rajaOngkirId,
          weight: this.productDetail.weight
        };
        this.getShippingRates(queryParam);
      }

      // // console.log('this.shippingAddress: ', this.shippingAddress);
      // // console.log('this.shippingAddressList: ', this.shippingAddressList);
    });
  }

  spesifikasi() {
    this.active();
    this.activeSpesifikasi = true;
    this.tabVal = this.productDetail.specification;
  }

  deskripsi() {
    this.active();
    this.activeDiskripsi = true;
    this.activeSpesifikasi = false;
    this.tabVal = this.productDescription;
  }
  onSent() {
    const a = {
    discusParentId : this.idDicus,
    message : this.messageString.value,
    productId: this.productDetail.productId
  };
  if (this.isLogin) {
    this.productService.createDiscus(a).subscribe(rsl => {
      console.log(rsl);
      window.location.reload();
      });
  } else {
    swal({
      title: 'Oops',
      text: 'Maaf anda harus login untuk melanjutkan',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/account/sign-in/' + this.productDetail.productId + '/' + this.productDetail.name]);
      }
    });
  }
}

  diskusi() {
    this.active();
    this.activeDiskusi = true;
    this.tabVal = this.productDiskusi;
  }

  ulasan() {
    this.active();
    this.activeUlasan = true;
    this.tabVal = this.productUlasan;
  }

  gotTodetailPart(id, name) {
    const r = name.replace(new RegExp('/', 'g'), ' ');
    // // console.log(r);
    this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    window.scrollTo(0, 0);
  }

  shippingChange() {
    // // console.log('aaaa');
  }
  BtnBuat() {
    const a = {
      message : this.messageBottom.value,
      productId: this.productDetail.productId
    };
    console.log('ini a', this.oktest);
    if (this.isLogin) {
      this.productService.createDiscus(a).subscribe(rsl => {
        console.log(rsl);
        window.location.reload();
        });
    } else {
      swal({
        title: 'Oops',
        text: 'Maaf anda harus login untuk melanjutkan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
          console.log('asd');
        }
      });
    }
  }

  addToCart(productId, storeId) {
    const userData = this.userService.getUserData(this.authService.getToken());
    // // console.log('userData: ', userData);

    if (userData) {
      if (userData.storeId === storeId) {
        swal(
            'belisada.co.id',
            'Product ini berasal dari Toko Anda'
          );
      } else {
        if (this.qty === undefined) {
          swal(
            'belisada.co.id',
            'Jumlah harus di pilih!'
          );
        } else {
          const addToCartRequest: AddToCartRequest = {
            productId: productId,
            quantity: this.qty,
            courierCode: this.shippingRates.courierCode,
            courierService: this.shippingRates.courierService,
            shippingAddressId: this.shippingAddress.addressId
          };

          this.shoppingCartService.create(addToCartRequest).subscribe(response => {
            // // console.log('response: ', response);
            if (response.status === 1) {
              // this.shoppingCartService.addItem(productId, +quantity);
              this.shoppingCartService.addItem(productId, +this.qty, +response.itemCartId);
            } else {
              swal('belisada.co.id', response.message, 'error');
            }
          });
        }
      }
    } else {
      this.shoppingCartService.addItem(productId, +this.qty);
    }
  }

  getShippingRates(queryParam) {
    this.shoppingCartService.getShippingRates(queryParam).subscribe(response => {
      this.rates = response;
    });
  }

  increaseQty() {
    this.qty += 1;
  }

  decreaseQty() {
    if (this.qty > 1) { this.qty -= 1; }
  }

  penawaran(id, name) {

    const r = name.replace(new RegExp('/', 'g'), ' ');
    this.router.navigate(['/product/another-offer/' + id + '/' + r]);
    window.scrollTo(0, 0);
  }

}
