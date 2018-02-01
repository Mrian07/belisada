import { ProductDetailService } from './../../../../core/service/product-detail/product-detail.service';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { Subject } from 'rxjs/Subject';
import { ProductDetail } from '../../../../core/model/product-detail';
import { Product } from '../../../../core/model/product';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { CartItemRequest, CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { TokenService } from '../../../../core/service/token/token.service';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { ProductService } from '../../../../core/service/product/product.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { TranslateService } from '@ngx-translate/core';
interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;

  itemsTotal: number;

  tabs: any;
  act_key: any;
  productId: any;
  specialPrice: 3;
  percent: any;
  highlight;
  quantity;
  kamp: any;
  diskon2: any;
  popx: any;
  diskon3: any;
  // percent: any;
  ProductList: ProductDetail = new ProductDetail();
  ProductImage: any;
  getDetailProd: Subscription;
  category2Id: number;
  login4: any;
  detailData: Subscription;
  storeData: any;
  otherStore: number;
  storeList: any;
  storeName: any;
  aliasName;
  theImage: string;
  arrStock: number[];
  asap: Boolean = true;
  specs: any;

  garansiDay = [
    {day: 0 , val: 'Tidak Bergaransi'},
    {day: 30 , val: '1 Bulan'},
    {day: 90 , val: '3 Bulan'},
    {day: 182 , val: '6 Bulan'},
    {day: 365 , val: '1 Tahun'},
  ];
  garansi: any;

  constructor(private route: ActivatedRoute,
    private detailService: ProductDetailService,
    private shoppingCartService: ShoppingCartService,
    private searchService: SearchService,
    private actionsSubject: ActionsSubject,
    private title: Title,
    private router: Router,
    private store: Store<fromProduct.Details>,
    private ngZone: NgZone,
    private tokenService: TokenService,
    private productService: ProductService,  public translate: TranslateService
  ) { }
  private componetDestroyed: Subject<Boolean> = new Subject();

  ngOnInit() {
    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
    this.route.params.subscribe( params => {
      this.productId = params.id;
      this.store.dispatch(new frontActions.GetDetail(this.productId));
    });
    // this.ininih(this.productId);
    this.getDetailProd = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GETDETAILSSUCCESS)
    .subscribe((action: frontActions.GetDetailSuccess) => {
       this.getDetail();
    });
    window.scrollTo(0, 0);
  }

  public carouselTileLoad(evt: any) {
    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }

  getDetail() {
    this.detailData = this.store.select<any>(fromProduct.getDetailState)
      .subscribe(data => {
        if (data.detail !== undefined) {
          this.ProductList = data.detail;
          //console.log(this.ProductList);
          //console.log(this.ProductList.mBpartnerStoreId);
          //this.saveSearch(this.ProductList.productId, this.ProductList.name);
          const garansi = this.garansiDay.find(x => x.day === this.ProductList.guaranteeDays);
          this.garansi = garansi.val;
          this.specs = data.detail.specification.length;
          if ( this.ProductList.isAsapShipping === 'Y') {
            this.asap = true;
          }else {
            this.asap = false;
          }
          const harga = (this.ProductList.specialPrice / this.ProductList.pricelist);
          const diskon = 1 - harga;
          this.kamp = (this.ProductList.pricelist - this.ProductList.specialPrice);
          this.diskon2 = diskon * 100;
          this.diskon3 = this.ProductList.pricelist * this.diskon2;
          this.popx = Math.round(this.diskon2);
          this.ProductImage = this.ProductList.image;
          this.storeName = this.ProductList.storeName;
          this.arrStock = Array.from(new Array(this.ProductList.stock), (val, index) => index + 1);
          if (this.storeName === '') {
            this.storeName = 'Belisada.co.id';
          }
          this.theImage = this.ProductImage[0];
          this.title.setTitle('Belisada - ' + this.ProductList.name);
        }
        if (data.stores !== undefined) {
          this.storeData = data.stores;
          this.otherStore = data.stores.productCount;
          this.storeList = data.stores.productList;
          //console.log(this.storeList);
       }
      });
  }

  saveSearch(id: number, name: string) {
    const data = {
        productId: id,
        keyword: name
    };
    this.searchService.savePopular(data).subscribe( res => {
      //console.log(res);
    });
    //console.log(data);
  }

  setimage(image) {
    this.theImage = image;
  }

  public addProductToCart(productId: number, quantity: number, mstoreId: number): void {
   const st = this.tokenService.getUser();

   if (st) {
    const stID = st.stores[0].mBpartnerStoreId;
    if (stID === mstoreId) {
      swal(
            'Belisada.co.id',
            'Product ini berasaldari Toko Anda'
          );
    }else {
       if (quantity === undefined) {
        swal(
          'Belisada.co.id',
          'Jumlah harus di pilih!'
        );
      } else {
        const cartItemRequest: CartItemRequest = new CartItemRequest();
        cartItemRequest.productId = this.ProductList.productId;
        cartItemRequest.price = this.ProductList.pricelist;
        cartItemRequest.weightPerItem = this.ProductList.weight;
        cartItemRequest.quantity = quantity;

        if (this.tokenService.getUser()) {
          this.shoppingCartService.create(cartItemRequest).subscribe(response => {
            //console.log('response: ', response);
            this.shoppingCartService.addItem(productId, +quantity, +response.id);
          });
        } else {
          this.shoppingCartService.addItem(productId, +quantity);
        }
      }
    }
   }
  }
  ininih(productId) {
    const data3 = {
      productId: productId
    };
    this.detailService.create(data3).subscribe(response => {
      if (response.status === '1') {
        swal('Terimakasih, Item Anda Sudah Masuk Kedalam Wishlist');
      } else {
        swal(response.message);
      }
    });
  }
  // ininih(productId) {
  //   const data3 = {
  //     productId: productId
  //   };
  //   this.detailService.wishListCreate(data3).subscribe(response => {
  //       console.log('berhasil cuy');
  //   });
  //   console.log('ini loh3333', this.productId);
  // }
  home() {
    this.router.navigateByUrl('/');
  }
  asap3() {
    this.router.navigateByUrl('/asap');
    // console.log(this.router.navigateByUrl('/Asap'));
  }

  detail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }

  ngOnDestroy() {
    //this.detailData.unsubscribe();
  }
}
