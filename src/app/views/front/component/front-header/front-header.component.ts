import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { CategoryService } from '../../../../core/service/category/category.service';
import { SearchService } from '../../../../core/service/search/search.service';
import { Search } from '../../../../core/model/search';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../../core/service/seo.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../../core/model/product';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { ProductService } from '../../../../core/service/product/product.service';

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

  categorySearch: Category[];
  selectedCategory: any;
  selectedSearchCategory: any;
  results = [];
  imgTop: any;
  selectCatsK: any;
  queryParams: any = {};
  isLogin: Boolean = false;

  title: string;
  text: string;
  type: string;

  private cartSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService) { }

  ngOnInit() {
    this.loadDataCategorySearch();
    // console.log('kampret di home search');
    this.seo.generateTags({
      title: 'Home',
      description: 'Belisada Home'
    });
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.cartItems = [];
      cart.items.forEach(item => {
        this.productService.get(item.productId).subscribe((product) => {
          // const product = prod;
          this.cartItems.push({
            ...item,
            product,
            totalCost: product.pricelist * item.quantity });
            console.log('this.cartItems: ', this.cartItems);
        });
      });
    });
  }

  public removeProductFromCart(productId: number, quantity: number): void {
    this.shoppingCartService.addItem(productId, -quantity);
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
      });
    }
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
    }
  }

  productSelected(hasil: any) {
    this.router.navigateByUrl('/Product-detail/' + hasil.productId);
    this.results = [];
  }
  hapusbersih() {
    this.selectedSearchCategory = '';
  }
  loadDataCategorySearch() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categorySearch = data;
    });
  }

  home() {
    location.replace('/');
  }
  searchEnter(searchKey, searchCategory) {
    this.queryParams = { q: searchKey };
    if (typeof searchCategory !== 'undefined') {
      this.queryParams['parent'] = 1;
      this.queryParams['id'] = searchCategory.mProductCategoryId;
    }
    this.router.navigate(['/search'], { queryParams: this.queryParams });
    this.selectedSearchCategory = '';
  }

  login() {
    // this.isLogin = true;
    swal({
      title: 'Login Akun',
      // text: 'Silakan login sesuai dengan type akun Anda',
      type: 'info',
      html:
        '<div class="content">' +
        '<div class="ui grid">' +
            '<div class="eight wide column">' +
                '<div class="column">' +
                    '<div class="ui segment">' +
                        '<p><strong><i class="shopping bag icon"></i> Sebagai Buyer</strong></p>' +
                        // '<p>Login untuk customer Belisada.</p>' +
                        '<a href="/sign-in" class="ui green button">Enter</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="eight wide column">' +
                '<div class="column">' +
                    '<div class="ui segment">' +
                        '<p><strong><i class="shop icon"></i> Sebagai Seller</strong></p>' +
                        // '<p>Login untuk seller Belisada.</p>' +
                        '<a href="/login" class="ui olive button">Enter</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

    '</div>',
        showCloseButton: true,
        showConfirmButton: false,
        confirmButtonText: 'Yes, delete it!'
    } );
  }

  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  viewCart() {
    this.router.navigateByUrl('/cart');
  }
}
