import { Component, OnInit } from '@angular/core';
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
    this.productStoreUrl = environment.thumborUrl + 'unsafe/200x200/center/filters:fill(fff)/';
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
        console.log(product.data);
        this.productAtas = product.data;
      }
    }));


    // this.activatedRoute.queryParams.subscribe((params: Params) => {

    //   this.activeQueryParams = Object.assign({}, params);
    //   this.loadData(params);
    // });

    this.loadData();

  }

  public loadData() {

    const obsParams = combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
    (params, qparams) => ({ params, qparams }));

    obsParams.subscribe((route) => {
      const id = route.params.id;
      const queryParams = route.qparams;

      this.currentPage = (queryParams.page === undefined) ? 1 : +queryParams.page;

      this.productService.getProductAnotherVarian(id).subscribe(res => {
        console.log('ros:', res);
        this.productService.getProductDetailV2Variant(id).subscribe((variants) => {
          this.product = variants;
          console.log('variants : ', this.product);
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
        this.variantDetailBwah = res.content;

        console.log('isi', res);

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
          console.log(this.product);
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
    window.scrollTo(0, 0);
  }

  addToCart(productId, storeId, i) {
    console.log('123', productId, storeId, i);
    const userData = this.userService.getUserData(this.authService.getToken());
    console.log('userData: ', userData);
    console.log(this.cartItem);
    if (userData) {
      const addToCartRequest: AddToCartRequest = {
        productId: productId,
        quantity: 1,
        // courierCode: this.shippingRates[i].courierCode,
        // courierService: this.shippingRates[i].courierService,
        shippingAddressId: this.addressId
      };

      // console.log('ini', this.shippingRates[i].courierCode);
      this.shoppingCartService.create(addToCartRequest).subscribe(response => {
        if (response.status === 1) {
          this.shoppingCartService.addItem(productId, +this.cartItem[i], +response.itemCartId);
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