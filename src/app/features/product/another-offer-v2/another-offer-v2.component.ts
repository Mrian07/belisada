import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ProductsSandbox } from '../products.sandbox';
import { ProductService } from '@belisada/core/services/product/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { AuthService, UserService } from '@belisada/core/services';
import { AddressService } from '@belisada/core/services/address/address.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnotherOffersData, AnotherOffersDetailData, AnotherOfferDetail, UserData } from '@belisada/core/models';
import { environment } from '@env/environment';
import { ProductReviewResponse } from '@belisada/core/models/product/product-review';
import { AddToCartRequest } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import swal from 'sweetalert2';
import { LocalStorageEnum } from '@belisada/core/enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-another-offer-v2',
  templateUrl: './another-offer-v2.component.html',
  styleUrls: ['./another-offer-v2.component.scss']
})
export class AnotherOfferV2Component implements OnInit {
  private subscriptions: Array<Subscription> = [];
  public productAtas:        AnotherOffersData;
  productStoreUrl;
  public product;
  public activeVariants = [];
  public qty = 1;
  variantDetailBwah: AnotherOffersDetailData[];
  totalPenjual: number;
  hasil: any;
  currentPage: number;
  lastPage: number;
  pages: any = [];
  numberOfEl: any;
  prodIdAtas: any;

  role = 0;
  userData: UserData = new UserData();
  isLogin: Boolean = false;

  cartItem = [];
  cartItem2: number;


  shippingR: any[];

  addressId: number;
  shipRates = [];
  rates = [];
  shippingRates = [];

  totalElements: number;

  baseUrlSeller: string = environment.baseUrlSeller;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public productsSandbox: ProductsSandbox,

    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.productStoreUrl = environment.thumborUrl + 'unsafe/fit-in/200x200/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) {
      // this.avatar = this.userData.avatar;
      this.role = this.userData.role;
      this.isLogin = true;
    }

    this.subscriptions.push(this.productsSandbox.anotherProducts$.subscribe((product: any) => {
      // this.productsSandbox.anotherProdcut(product);
      if (product) {
        // this.productsSandbox.anotherProdcut(product);
        this.productAtas = product.data;
      }
    }));


    // this.activatedRoute.queryParams.subscribe((params: Params) => {

    //   this.activeQueryParams = Object.assign({}, params);
    //   this.loadData(params);
    // });

    this.loadData();

  }

  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  public loadData() {

    const obsParams = combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
    (params, qparams) => ({ params, qparams }));

    obsParams.subscribe((route) => {
      const id = route.params.id;
      const queryParams = route.qparams;

      this.currentPage = (queryParams.page === undefined) ? 1 : +queryParams.page;

      this.productService.getProductAnotherVarian(id).subscribe(res => {
        this.productService.getProductDetailV2Variant(id).subscribe((variants) => {
          this.product = variants;
          this.activeVariants = [];
          variants.forEach(variant => {
            this.activeVariants.push('');
          });

          this._fetchQueryParams();
        });

      });

      this.prodIdAtas = route.params.id;
      this.pages = [];
      this.productService.getProductDataDetail(id, queryParams).subscribe((res) => {

        console.log('apa', res);
        this.variantDetailBwah = res.content;
        this.totalElements  = res.totalElements;
        // this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
        const x = res.number;         // assign the value 5 to x
        const y = 1;         // assign the value 2 to y
        const z = x + y;     // assign the value 7 to z (x + y)
        this.hasil = z;
        this.numberOfEl = res.numberOfElements;

        this.lastPage = res.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= res.totalPages) {
            this.pages.push(r);
          }
        }
      });



    });
  }

  public selectVariant(attributeId, attributeValueId, index) {

    this.activeVariants[index] = [attributeId, attributeValueId].join(':');

    let queryValueString = this.activeVariants.toString();
    if (this.activeVariants.includes('')) queryValueString = queryValueString.replace(/,/g, '');

    this.router.navigate(
      ['/product/another-offers/'
        + this.activatedRoute.snapshot.params.id],
      {
        queryParams: {
          varians: queryValueString
        }
      }
    );
  }
  private _fetchQueryParams() {
    this.activatedRoute.queryParams.subscribe(queryParam => {
      if (queryParam.varians) {
        const variants = queryParam.varians.split(',');
        variants.forEach(variant => {
          const index = this.product.findIndex(x => x.attributeId === +variant.split(':')[0]);
          this.activeVariants[index] = variant;
        });
      }
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/product/another-offers/' + this.prodIdAtas], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  addToCart(productId, storeId, i) {
    const userData = this.userService.getUserData(this.authService.getToken());
    if (userData) {
      const addToCartRequest: AddToCartRequest = {
        productId: productId,
        quantity: this.qty,
        // courierCode: this.shippingRates[i].courierCode,
        // courierService: this.shippingRates[i].courierService,
        shippingAddressId: this.addressId
      };
      this.shoppingCartService.create(addToCartRequest).subscribe(response => {

        if (response.status === 2) {
          swal('belisada.co.id', response.message, 'error');
        } else if (response.status === 1) {
          this.shoppingCartService.addItem(productId, this.qty, +response.itemCartId);
        } else {
          swal('belisada.co.id', response.message, 'error');
        }
      });
      // if (userData.storeId === storeId) {
      //   swal(
      //       'belisada.co.id',
      //       'Product ini berasal dari Toko Anda'
      //     );
      // } else {
      //   if (this.cartItem[i] === undefined) {
      //     swal(
      //       'belisada.co.id',
      //       'Jumlah harus di pilih!'
      //     );
      //   } else {
      //   }
      // }
    } else {
      this.shoppingCartService.addItem(productId, 1);
    }
  }
  navigateToIkutJualan() {
    this.router.navigate(['/buyer/create-store']);
  }
}
