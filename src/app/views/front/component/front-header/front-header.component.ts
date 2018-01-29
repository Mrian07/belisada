import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { Search } from '../../../../core/model/search';
import { SeoService } from '../../../../core/service/seo.service';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { Product } from '../../../../core/model/product';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { ProductService } from '../../../../core/service/product/product.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { LoginService } from '../../../../core/service/login/login.service';
import { TruncateModule } from 'ng2-truncate';


interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss'],
})
export class FrontHeaderComponent implements OnInit {

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  private cartSubscription: Subscription;

  categorySearch: Category[];
  selectedCategory: any;
  selectedSearchCategory: any;
  results = [];
  imgTop: any;
  selectCatsK: any;
  queryParams: any = {};
  isLogin: Boolean = false;
  user: any;
  title: string;
  text: string;
  type: string;
  loginState: Boolean;
  userName: string;
  avatar: string;
  itemsTotal: number;

  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService,
    private profileService: ProfileService,
    private router: Router,
    private auth: TokenService,
    private route: ActivatedRoute,
    private seo: SeoService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private loginService: LoginService,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user) {
      this.loginState = true;
      this.getProfile();
    }else {
      this.loginState = false;
      this.avatar = 'assets/img/user.jpg';
      this.itemCount = 0;
    }
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
    this.shoppingCart();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.results = [];
  }

  searchK(event) {
    const key = event.target.value;
    if (key === '' || event.key === 'Enter') {
      this.results = [];
    } else {
      this.searchService.search(key).subscribe(data => {
        this.results = data;
        // console.log(data);
      });
    }
  }

  searchEnter(searchKey, searchCategory) {
    console.log('test');
    this.queryParams = { q: searchKey };
    if (typeof searchCategory !== 'undefined') {
      this.queryParams['parent'] = 1;
      this.queryParams['id'] = searchCategory.mProductCategoryId;
    }
    this.router.navigate(['/search'], { queryParams: this.queryParams });
    this.selectedSearchCategory = '';
  }

  getProfile() {
    this.profileService.getProfileBuyer(this.auth.getToken()).subscribe(data => {
      this.userName = data.name;
      if (data.imageAvatar === '') {
        this.avatar = 'assets/img/user.jpg';
      }else {
        this.avatar = 'data:image/png;base64,' + data.imageAvatar;
      }
    });
  }

  shoppingCart() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.itemsTotal = cart.itemsTotal;
      this.cartItems = [];
      cart.items.forEach(item => {
        this.productService.get(item.productId).subscribe((product) => {
          // const product = prod;
          this.cartItems.push({
            ...item,
            product,
            totalCost: product.pricelist * item.quantity });
        });
      });
    });
  }

  public removeProductFromCart(productId: number, quantity: number, itemCartId: number): void {
    swal({
      title: 'Belisada.co.id',
      text: 'Apakah Anda Yakin?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.value) {
        this.shoppingCartService.delete(itemCartId).subscribe(response => {
          if (response.status === '1') {
            this.shoppingCartService.addItem(productId, -quantity);
            swal(
              'Dihapus!',
              'Belanjaan Anda berhasil dihapus',
              'success'
            );
          } else {
            swal(response.message);
          }
        });
      }
    });
  }

  home() {
    this.router.navigateByUrl('/');
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {}
  }

  productSelected(hasil: any) {
    this.router.navigateByUrl('/Product-detail/' + hasil.productId + '/' + hasil.aliasName);
    this.results = [];
  }
  hapusbersih() {
    this.selectedSearchCategory = '';
  }

  register() {
    this.router.navigateByUrl('/sign-up');
  }

  login() {
    this.router.navigateByUrl('/sign-in');
    // this.isLogin = true;
    // swal({
    //   title: 'Login Akun',
    //   // text: 'Silakan login sesuai dengan type akun Anda',
    //   type: 'info',
    //   html:
    //     '<div class="content">' +
    //     '<div class="ui grid">' +
    //         '<div class="eight wide column">' +
    //             '<div class="column">' +
    //                 '<div class="ui segment">' +
    //                     '<p><strong><i class="shopping bag icon"></i> Sebagai Buyer</strong></p>' +
    //                     // '<p>Login untuk customer Belisada.</p>' +
    //                     '<a href="/sign-in" class="ui green button">Enter</a>' +
    //                 '</div>' +
    //             '</div>' +
    //         '</div>' +
    //         '<div class="eight wide column">' +
    //             '<div class="column">' +
    //                 '<div class="ui segment">' +
    //                     '<p><strong><i class="shop icon"></i> Sebagai Seller</strong></p>' +
    //                     // '<p>Login untuk seller Belisada.</p>' +
    //                     '<a href="/login" class="ui olive button">Enter</a>' +
    //                 '</div>' +
    //             '</div>' +
    //         '</div>' +
    //     '</div>' +

    // '</div>',
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     confirmButtonText: 'Yes, delete it!'
    // } );
  }

  toProductDetail(id: number, alias: string) {
    this.router.navigateByUrl('/Product-detail/' + id + '/' + alias);
  }
  viewCart() {
    this.router.navigateByUrl('/cart');
  }
  checkout() {
    this.router.navigateByUrl('/checkout');
  }


  logout() {
    swal({
      title: 'Belisada.co.id',
      text: 'Anda yakin akan logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('user');
        this.shoppingCartService.empty();
        setTimeout(() => {
          location.replace('/');
        }, 300);
      } else if (result.dismiss === 'cancel') {
      }
    });
  }
}
