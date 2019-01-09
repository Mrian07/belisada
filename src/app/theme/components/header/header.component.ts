import { ProductDetailSimple } from '@belisada/core/models/product/product-detail-simple';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { Component, OnInit } from '@angular/core';

import { UserData } from '@belisada/core/models';
import { UserService, Globals, ShareMessageService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { Category } from '@belisada/core/models/category/category.model';
import { CategoryService } from '@belisada/core/services/category/category.service';
import { SearchBarResponse } from '@belisada/core/models/search/search.model';
import { SearchService } from '@belisada/core/services/search/search.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { ThumborSizingEnum } from '@belisada/core/services/thumbor/thumbor.sizing.enum';
import { ThumborService } from '@belisada/core/services/thumbor/thumbor.service';
import { BannerService } from '@belisada/core/services/banner/banner.service';
import { BannerData } from '@belisada/core/models/banner/banner.model';
import { environment } from '@env/environment';
import swal from 'sweetalert2';

interface ICartItemWithProduct extends CartItem {
  product: ProductDetailSimple;
  totalCost: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  /**
   *  #[(ngModel)]
   */
  public keywordSearch: string;
  public categoryId: number;
  /** --------------- */

  /**
   *  #List variable
   */
  public menuCategory: Category[];
  public subMenuCategory: Category[];
  public searchBarResults: SearchBarResponse[];
  /** ---------------- */

  public bannerTop: BannerData = new BannerData();
  public bannerSearch: BannerData = new BannerData();

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  public itemsTotal: number;
  private _cartSubscription: Subscription;

  public userData: UserData = new UserData();

  public showSearch: boolean;

  public thumborProfilePicture: string;

  public flag: string;
  public btnJual: boolean;

  public baseUrlSeller: string = environment.baseUrlSeller;

  constructor(
    public globals: Globals,
    private _shareMessageService: ShareMessageService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _searchService: SearchService,
    private _shoppingCartService: ShoppingCartService,
    private _productService: ProductService,
    private _thumborService: ThumborService,
    private _bannerService: BannerService,
    private _router: Router,
  ) {
    this.searchBarResults = [];
    this.showSearch = false;
  }

  ngOnInit() {
    this._getCategory();
    this._getData();
    this._shoppingCart();
    this._getBennerData();
  }

  public onSearchFocusOut() {
    setTimeout(() => {
      this.showSearch = false;
    }, 100);
  }

  public searchK(event) {
    if (event.keyCode !== 13) {
      this.showSearch = true;
    }
    const queryParams = {
      q: this.keywordSearch
    };
    this._searchService.getSearchBar(queryParams).subscribe(result => {
      this.searchBarResults = result;
    });
  }

  public onSearchSubmit() {
    const queryParams = {
      st: 'product',
      q: this.keywordSearch
    };
    this.showSearch = false;
    this._router.navigate(['/search-result/product-list'], { queryParams: queryParams });
  }

  public clickSearch(catID) {
    const queryParams = {
      st: 'product',
      q: this.keywordSearch,
      category: [catID]
    };
    this._router.navigate(['/search-result/product-list'], { queryParams: queryParams });
  }

  public logout() {
    swal({
      title: 'belisada.co.id',
      text: 'Anda yakin akan logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // if (localStorage.getItem('isRemember') === 'true') {
          localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
        // } else {
        //   sessionStorage.clear();
        //   localStorage.removeItem('isRemember');
        // }
        this._shoppingCartService.empty();
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(() => {
          this._router.navigateByUrl('/');
          location.reload();
        });
      }
    });
  }


  private _shoppingCart() {
    this.cart = this._shoppingCartService.get();
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.itemsTotal = cart.itemsTotal;
      this.cartItems = [];
      cart.items.forEach(item => {
        this._productService.get(item.productId).subscribe(result => {
          const product = result.data;
          const option = {
            width: 150,
            height: 150,
            fitting: ThumborSizingEnum.FIT_IN,
            filter: {
              fill: 'fff'
            }
          };
          const newImgUrl = this._thumborService.process(product.imageUrl, option);
          product.imageUrl = newImgUrl;

          this.cartItems.push({
            ...item,
            product,
            totalCost: product.pricelist * item.quantity });
        });
      });
    });
  }

  private _getData() {
    this.userData = this._userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
  }

  private _getCategory(id?: number) {
    const queryParams = {
      ob: 'name',
      ot: 'asc',
    };
    this._categoryService.getAllCategory(queryParams).subscribe(response => {
      this.menuCategory = response.data;
      this._subMenu(this.menuCategory[0].categoryId);
      this.subMenuCategory = [];
    });
  }

  private _subMenu(id) {
    const queryParams = {
      ob: 'name',
      ot: 'asc',
      parentid: id,
    };
    this._categoryService.getAllCategory(queryParams).subscribe(response => {
      this.subMenuCategory = response.data;
    });
  }

  private _getBennerData() {
    this._bannerService.getBannerTop().subscribe(response => {
      this.bannerTop = response.data;
    });
    this._bannerService.getBannerSearch().subscribe(response => {
      this.bannerSearch = response.data;
    });
  }

  cekFlag() {
    this._shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'create-store') {
        this.btnJual = true;
      }
    });
  }

  goToCreateStore() {
    this._router.navigateByUrl('/buyer/create-store');
    this.cekFlag();
  }
}
