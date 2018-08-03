import { ProductDetailList, MoreInformation } from '@belisada/core/models/product/product.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../core/services/product/product.service';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { AddToCartRequest } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { UserService, AuthService, HomeSService } from '@belisada/core/services';
import swal from 'sweetalert2';
import { Home } from '@belisada/core/models';
import { AddressService } from '@belisada/core/services/address/address.service';
import { GetShippingResponse } from '@belisada/core/models/address/address.model';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // id: number;
  // name: string;

  isLogin: Boolean = false;
  shippingRates: any;

  shippingAddress: any;
  rates: ShippingRate[];
  // selectedShippingAddress: GetShippingResponse;

  productDetail: ProductDetailList = new ProductDetailList();
  moreInformation: MoreInformation = new MoreInformation();

  shippingAddressList: GetShippingResponse[];

  qty = 1;
  // currentPage: number;
  // pages: any = [];

  tabVal: any;
  activeSpesifikasi: boolean;
  activeDiskripsi: boolean;
  activeDiskusi: boolean;
  activeUlasan: boolean;

  imgIndex: string;

  storeImageUrl;
  productImageUrl;
  productNewatProdDetail: Home[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private homeS: HomeSService,
    private shoppingCartService: ShoppingCartService,
    private addressService: AddressService
  ) {
    this.storeImageUrl = 'http://image.belisada.id:8888/unsafe/218x218/';
    this.productImageUrl = 'http://image.belisada.id:8888/unsafe/fit-in/400x400/filters:fill(fff)/';
    this.shippingAddressList = [];
    this.shippingRates = '';
    this.shippingAddress = '';
  }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.isLogin = true;
    }
    // console.log('shippingAddress: ', this.shippingAddress);
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
      // console.log('ini res: ', res);
    });
    this.activatedRoute.params.subscribe((params: Params) => {

      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.moreInformation = res.data.moreInformation;
        console.log('this.productDetail: ', this.productDetail);
        this.tabVal = this.productDetail.specification;

        // console.log('ini tabval', this.tabVal);
        this.imgIndex = this.productDetail.imageUrl[0];
        console.log('this.imgIndex: ', this.imgIndex);

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

  goStore(url) {
    this.router.navigate(['/' + url]);
    // console.log(url);
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

      // console.log('this.shippingAddress: ', this.shippingAddress);
      // console.log('this.shippingAddressList: ', this.shippingAddressList);
    });
  }

  spesifikasi() {
    this.active();
    this.activeSpesifikasi = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = this.productDetail.specification;
        // console.log(this.tabVal);
      });
    });
  }

  deskripsi() {
    this.active();
    this.activeDiskripsi = true;
    this.activeSpesifikasi = false;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = this.productDetail.description;
      });
    });
  }

  diskusi() {
    this.active();
    this.activeDiskusi = true;
    this.tabVal = 'Coming soon 1...';
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = 'Coming soon 1...';
      });
    });
  }

  ulasan() {
    this.active();
    this.activeUlasan = true;
    this.tabVal = 'Coming soon 2...';
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.detailProduct(params['id']).subscribe(res => {
        this.productDetail = res.data;
        this.tabVal = 'Coming soon 2...';
      });
    });
  }

  gotTodetailPart(id, name) {
    const r = name.replace(new RegExp('/', 'g'), ' ');
    // console.log(r);
    this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    window.scrollTo(0, 0);
  }

  shippingChange() {
    // console.log('aaaa');
  }

  addToCart(productId, storeId) {
    const userData = this.userService.getUserData(this.authService.getToken());
    // console.log('userData: ', userData);

    if (userData) {
      if (userData.storeId === storeId) {
        swal(
            'belisada.id',
            'Product ini berasal dari Toko Anda'
          );
      } else {
        if (this.qty === undefined) {
          swal(
            'belisada.id',
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
            // console.log('response: ', response);
            if (response.status === 1) {
              // this.shoppingCartService.addItem(productId, +quantity);
              this.shoppingCartService.addItem(productId, +this.qty, +response.itemCartId);
            } else {
              swal('belisada.id', response.message, 'error');
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
}

