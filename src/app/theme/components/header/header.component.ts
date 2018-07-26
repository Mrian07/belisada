import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { ProductDetailSimple } from '@belisada/core/models/product/product-detail-simple';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UserData } from '@belisada/core/models';
import { UserService, SearchBarService, Globals, AuthService, StoreService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { SearchService } from '@belisada/core/services/search/search.service';
import { SearchBarResponse } from '@belisada/core/models/search/search.model';
import { ShareMessageService } from '@belisada/core/services';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '@belisada/core/services/product/product.service';
import { CategoryService } from '@belisada/core/services/category/category.service';
import { Category } from '@belisada/core/models/category/category.model';

interface ICartItemWithProduct extends CartItem {
  product: ProductDetailSimple;
  totalCost: number;
}

import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Province, District, Village, City } from '@belisada/core/models/store/address';
import { CheckStoreRequest } from '@belisada/core/models/store/store.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  menuCategory: Category[];
  subMenuCategory: Category[];
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

  avatar = 'assets/img/profile.png';

  itemsTotal: number;

  isMenu: Boolean = false;

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  private cartSubscription: Subscription;


  /*
    dibawah buat popUp
  */
 public validationOnpopUpCreateStore: FormGroup;
 provinces: Province[];
 nameOwner: FormControl;
 serverMessage: String;
 fm: any = {};
 cities: City[];
 curentPostal: any;
 districts: District[];
 villages: Village[];
 nameChecking: Boolean = false;
 storeName: FormControl;
 pending_submit: Boolean = false;
 timer: any;
 ip: string;
 country: string;
 storeUrl: FormControl;
 regForm: boolean;
 regSuccess: boolean;
 role = 0;

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
    private authService: AuthService,
    private fb: FormBuilder, private storeService: StoreService, private userS: UserService, private categoryService: CategoryService
  ) {
    this.searchBarResults = [];
  }

  ngOnInit() {
    this.flagStatus();
    this.getCategory();
    this.regForm = true;
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
      //   province: new FormControl(null, Validators.required),
      //   city: new FormControl(null, Validators.required),
      //   district: new FormControl(null, Validators.required),
      //   villageId: new FormControl(null,
      //       Validators.required,
      //   ),
      //   postal: new FormControl('', [
      //       Validators.required,
      //       Validators.minLength(5),
      //       Validators.maxLength(5)

      //   ]),
      //   description: new FormControl(null, Validators.required)
    });
    this.getData();
    this.cekFlag();
    this.shoppingCart();
  }

  getData() {
    this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) {
      this.avatar = this.userData.avatar;
      this.role = this.userData.role;
      this.isLogin = true;
    }
  }

  goToSeller() {
    window.location.href = 'https://seller0.belisada.id/auth/sign-in';
  }

  navigateToIkutJualan() {
    this.router.navigate(['/buyer/create-store']);
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

  mulaiBerjualan() {
    console.log('asdasdasd');
  }

  cekFlag() {
    this.shareMessageService.currentMessage.subscribe(respon => {
        if (respon === 'update-profile') {
          this.getData();
        } else if (respon === 'close-menu-category') {
          // if (this.isMenu === true) {
            this.isMenu = false;
          //   console.log(this.isMenu);
          // }
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

flagStatus() {
  this.regForm = false;
  this.regSuccess = false;
}

onSent() {
  console.log('oke oce', this.validationOnpopUpCreateStore.value);
  if (this.validationOnpopUpCreateStore.valid) {
      const model = this.validationOnpopUpCreateStore.value;

      this.userS.createFormGuest(model).subscribe(rsl => {
          if (rsl.status === 1) {
                  // swal(rsl.message);
                this.flagStatus();
                this.regSuccess = true;
          } else {
                swal(rsl.message);
          }
      });
  } else {
      swal('ops maaf ada kesalahan');
      this.validateAllFormFields(this.validationOnpopUpCreateStore);
  }
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
  goToTrxHistory() {
    this.router.navigateByUrl('/buyer/order');
  }

  shoppingCart() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.itemsTotal = cart.itemsTotal;
      this.cartItems = [];
      cart.items.forEach(item => {
        this.productService.get(item.productId).subscribe(result => {
          const product = result.data;
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

  closeAllCategory() {
    this.isMenu = false;
  }

  menuAllCategory(data) {
    console.log('click',  data);
    if (data === true) {
      this.isMenu = false;
      this.shareMessageService.changeMessage('close-menu-category');
    } else {
      this.isMenu = true;
      this.shareMessageService.changeMessage('open-menu-category');
      this.getCategory();
    }
  }

  getCategory(id?: number) {
    const queryParams = {
      ob: 'name',
      ot: 'asc',
    };
    // if (id) { queryParams['parentid'] = id; }
    console.log('queryParams: ', queryParams);
    this.categoryService.getAllCategory(queryParams).subscribe(response => {
      this.menuCategory = response.data;
      this.subMenuCategory = [];
      // if (id) { this.subMenuCategory = response.data; }
      console.log('category', this.menuCategory);
    });
  }

  subMenu(id) {
    const queryParams = {
      ob: 'name',
      ot: 'asc',
      parentid: id,
    };
    this.categoryService.getAllCategory(queryParams).subscribe(response => {
      this.subMenuCategory = response.data;
      console.log('sub category', response);
    });
  }
}
