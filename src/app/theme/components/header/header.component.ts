import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UserData } from '@belisada/core/models';
import { UserService, SearchBarService, Globals, AuthService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { SearchService } from '@belisada/core/services/search/search.service';
import { SearchBarResponse } from '@belisada/core/models/search/search.model';
import { ShareMessageService } from '@belisada/core/services';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { ProductDetailSimple } from '@belisada/core/models/product/product-detail-simple';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { ProductService } from '@belisada/core/services/product/product.service';

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

  isSelectBoxActive: Boolean = false;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  isAccountMenu: Boolean = false;
  results = [];
  queryParams: any = {};
  // selectedSearchCategory: any;
  searchBarResults: SearchBarResponse[];
  keyword: string;
  showSearch: Boolean = false;

  avatar: string;

  itemsTotal: number;

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  private cartSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService,
    private search: SearchBarService,
    private searchService: SearchService,
    private shareMessageService: ShareMessageService,
    private globals: Globals,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.searchBarResults = [];
  }

  ngOnInit() {
    this.getData();
    this.cekFlag();
    this.shoppingCart();
  }

  getData() {
    // if (localStorage.getItem('isRemember') === 'true') {
      this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
      if (this.userData) {
        this.avatar = this.userData.avatar;
      }
    // } else {
    // // console.log('userData : ', this.userData);
    //   if (isPlatformBrowser(this.platformId)) {
    //     const sess = sessionStorage.getItem(LocalStorageEnum.TOKEN_KEY);
    //     this.userData = this.userService.getUserData(sess);
    //     if (this.userData) {
    //       this.avatar = this.userData.avatar;
    //     } else {
    //       this.avatar = 'assets/img/profile.png';
    //     }
    //   }
    // }
    if (this.userData) { this.isLogin = true; }
  }

  cekFlag() {
    this.shareMessageService.currentMessage.subscribe(respon => {
        if (respon === 'update-profile') {
          this.getData();
        }
    });
  }

  onSearchFocusOut() {
    setTimeout(() => {
      this.showSearch = false;
    }, 100);
  }

  searchK(event) {
    const key = event.target.value;
    // console.log('event: ', event.keyCode);
    // console.log('key: ', key);
    // console.log('this.keyword: ', this.keyword);
    if (event.keyCode !== 13) {
      this.showSearch = true;
    }
    this.keyword = key;
    const queryParams = {
      q: key
    };
    this.searchService.getSearchBar(queryParams).subscribe(result => {
      this.searchBarResults = result;
    });
  }
  searchEnter(event) {
    const key = event.target.value;
    this.queryParams = { st: 'product', q: key };
    this.showSearch = false;
    this.router.navigate(['/search-result/product-list'], { queryParams: this.queryParams });
  }

  clickSearch(key, catID) {
    const queryParams = {
      st: 'product',
      q: key,
      category: [catID]
    };
    this.router.navigate(['/search-result/product-list'], { queryParams: queryParams });
  }

  logout() {
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
        this.shoppingCartService.empty();
        this.isAccountMenu = false;
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(() => {
          this.router.navigateByUrl('/');
          location.reload();
        });
      }
    });
  }

  toggleAccountMenu() {
    this.isAccountMenu = !this.isAccountMenu;
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.isAccountMenu = false;
    }
  }
  goToProfile() {
    this.router.navigateByUrl('/buyer/profile');
  }

  shoppingCart() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.itemsTotal = cart.itemsTotal;
      this.cartItems = [];
      console.log('cart: ', cart);
      cart.items.forEach(item => {
        this.productService.get(item.productId).subscribe(result => {
          const product = result.data;
          this.cartItems.push({
            ...item,
            product,
            totalCost: product.pricelist * item.quantity });

            console.log('this.cartItems: ', this.cartItems);
        });
      });
    });
  }

  public removeProductFromCart(productId: number, quantity: number, itemCartId: number): void {
    swal({
      title: 'Belisada.co.id',
      text: 'Apakah item tersebut akan dihapus?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.value) {
        if (this.authService.getToken()) {
          this.shoppingCartService.delete(itemCartId).subscribe(response => {
            if (response.status === 1) {
              this.shoppingCartService.addItem(productId, -quantity);
              swal(
                'Sukses',
                'Item yang Anda pilih berhasil dihapus',
                'success'
              );
            } else {
              swal(response.message);
            }
          });
        } else {
          this.shoppingCartService.addItem(productId, -quantity);
        }
      }
    });
  }

}
