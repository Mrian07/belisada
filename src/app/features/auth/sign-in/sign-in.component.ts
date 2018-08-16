import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { filter } from 'rxjs/operators';

import { EmailChecking, SigninRequest } from '@belisada/core/models';
import { UserService, AuthService } from '@belisada/core/services';
import { Subscription } from 'rxjs';

import { Store, ActionsSubject } from '@ngrx/store';
import * as UserAction from '@belisada/core/ngrx/actions/auth';
import * as UserReducer from '@belisada/core/ngrx/reducers/auth';
import { ShoppingCart } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { StorageService } from '@belisada/core/services/local-storage/storage.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { LoadingService } from '@belisada/core/services/globals/loading.service';

const CART_KEY = 'cart';
const CART_POST_KEY = 'cartpost';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  /* Mendeklarasikan nama variable*/
  signinFormGroup: FormGroup;
  formSubmited: Boolean = false;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  penampung: any;
  emailInvalid: number;
  viewPass: Boolean = false;
  isRemember: string;
  LoginStatus: Subscription;
  test: any;
  private storage: Storage;
  param1: string;
  param2: string;
  // subscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private actionsSubject: ActionsSubject,
    private ngrx: Store<UserAction.Login>,
    private shoppingCartService: ShoppingCartService,
    private storageService: StorageService,
    private productService: ProductService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.storage = this.storageService.get();
    this.param1 = this.route.snapshot.params.id;
    this.param2 = this.route.snapshot.params.name;
    console.log(this.route.snapshot.params);
  }

  ngOnInit() {
    this.test = '';
    this.createFormControl();
    this.checkIsLogin();
  }

  ngAfterViewInit() {
    this.LoginStatus = this.actionsSubject.asObservable()
    .pipe(filter(action => action.type === UserAction.LOGINSUCCESS))
    .subscribe((action: UserAction.LoginSuccess) => {
      const form = this.signinFormGroup;
      const x = this.ngrx.select<any>(UserReducer.LoginState).subscribe( result => {
        // Handle result
        this.test = result;
        this.loadingService.hide();
        const token: string = this.test.token;
        // if (form.value.isRemember === 'true') {
        this.userService.setUserToLocalStorage(token);
        this.setCartToLocalStorage();
          // this.userService.setRemember('true');
        // } else {
        //   this.userService.setUserToSessionStorage(token);
        //   this.userService.setRemember('false');
        // }
        if (this.param1) {
          // this.router.navigateByUrl('/buyer/profile');
          window.location.reload();

        } else {
          this.router.navigateByUrl('/buyer/profile');
        }
        // this.router.navigateByUrl('/buyer/profile');
        // location.reload();

      }, error => {
        this.loadingService.hide();
        swal('belisada.co.id', 'unknown error', 'error');
      });

    });
  }

  checkIsLogin() {
    if (this.authService.getToken()) {
      if (!this.param1) {
        this.router.navigateByUrl('/buyer/profile');
      } else {
        // console.log('123');
      }
    }
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', Validators.required],
      isRemember: ['']
    });
  }

  /* Fungsi ini untuk melakukan input data sign in dengan melakukan validasi pengecekan email, password */
  onSubmit() {
    this.loadingService.show();
    const form = this.signinFormGroup;
    this.formSubmited = true;
    if (!form.valid) {
      this.loadingService.hide();
      return;
    }
    // if (form.valid) {

      const signinRequest: SigninRequest = form.value;
      this.ngrx.dispatch(new UserAction.TryLogin(signinRequest));
      this.formSubmited = false;
      form.reset();
      form.patchValue({email: signinRequest.email});
      // this.router.navigateByUrl('/');
      if (this.param1) {
        this.router.navigateByUrl('/product/product-detail/' + this.param1 + '/' + this.param2);
      }
    // }
    this.LoginStatus.unsubscribe();
  }

  /*Fungsi ini untuk berpindah halaman sign up jika user ingin melakukan pendaftaran*/
  goToSignUp() {
      this.router.navigateByUrl('/account/sign-up');
  }

  /* Fungsi ini untuk melakukan pengecekan email valid*/
  onSearchChange(searchValue: string) {
    const modelz = this.signinFormGroup.value;
    this.emailChecking.email = modelz.email,
    this.userService.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
        if (data.status === 1) {
          this.emailInvalid = 0;
        } else {
          this.emailInvalid = 1;
        }
      },
      error => {
          console.log('error', error);
      });
  }

  togglePass() {
    this.viewPass = !this.viewPass;
    const el = (<HTMLInputElement>document.getElementById('password'));
    if (this.viewPass) {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

  onKey(event: any) { // without type info
    this.penampung = event.keyCode === 9;
    if (event.keyCode === 9) {
    }
  }

  setCartToLocalStorage() {
    console.log('setCartToLocalStorage');
    const cart = new ShoppingCart();
    const preLoginCart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    // console.log('storedCart', storedCart);
    if (storedCart && JSON.parse(storedCart).items.length !== 0) {
      // if () {
        // console.log('isStoredCart');
        preLoginCart.updateFrom(JSON.parse(storedCart));
        preLoginCart.items.forEach((item, index) => {

          this.productService.get(item.productId).subscribe(product => {
            const prod = product.data;
            const data = {
              productId: prod.productId,
              quantity: item.quantity,
              price: (prod.specialPrice > 0) ? prod.specialPrice : prod.pricelist,
              weightPerItem: prod.weight
            };
            this.shoppingCartService.create(data).subscribe(response => {
              console.log('shoppingCartService-create: ', response);
              console.log(index + ' ~ ' + (preLoginCart.items.length - 1));
              if (index === preLoginCart.items.length - 1) {
                console.log('cb');
                return cb();
              } else {
                console.log('-------');
                return;
              }
            });
          });
        });
      // }
    } else {
      this.shoppingCartService.getSingleResult().subscribe(response => {
        console.log('response-getSingleResult: ', response);
        cart.grossTotal = response.grandTotal;
        cart.deliveryTotal = response.deliveryTotal;
        cart.itemsTotal = response.grandTotal;

        response.items.forEach((item, index) => {
          const cartItem = new CartItem();
          cartItem.itemCartId = item.itemCartId;
          cartItem.productId = item.productId;
          cartItem.quantity = item.quantity;
          cart.items.push(cartItem);
          // console.log('cart_loop', cart);
        });
        this.storage.setItem(CART_KEY, JSON.stringify(new ShoppingCart()));
        this.storage.setItem(CART_POST_KEY, JSON.stringify(cart));
        this.shoppingCartService.dispatch(cart);
        // console.log('jalan dulu gak ni?');
      });
    }

    const that = this;
    function cb() {
      console.log('callback called');
      that.shoppingCartService.getSingleResult().subscribe(response => {
        cart.grossTotal = response.grandTotal;
        cart.deliveryTotal = response.deliveryTotal;
        cart.itemsTotal = response.grandTotal;

        response.items.forEach((item, index) => {
          const cartItem = new CartItem();
          cartItem.itemCartId = item.itemCartId;
          cartItem.productId = item.productId;
          cartItem.quantity = item.quantity;
          cart.items.push(cartItem);
          // console.log('cart_loop', cart);
        });
        that.storage.setItem(CART_KEY, JSON.stringify(new ShoppingCart()));
        that.storage.setItem(CART_POST_KEY, JSON.stringify(cart));
        that.shoppingCartService.dispatch(cart);
        // console.log('jalan dulu gak ni?');
      });
    }
  }

  googleLogin() {
    this.loadingService.show();
    this.authService.doGoogleLogin()
    .then(res => {
      console.log('googleLogin-res: ' + JSON.stringify(res));
      const signinRequest: SigninRequest = new SigninRequest();
      signinRequest.email = res.additionalUserInfo.profile.email;
      signinRequest.avatar = res.additionalUserInfo.profile.picture;
      signinRequest.loginType = 'social';
      signinRequest.name = res.additionalUserInfo.profile.name;
      signinRequest.socialName = res.additionalUserInfo.providerId;
      signinRequest.socialToken = res.credential.idToken;
      // signinRequest.userType = res.additionalUserInfo.profile.email;
      this.ngrx.dispatch(new UserAction.TryLogin(signinRequest));
    }, err => {
      this.loadingService.hide();
      console.log('googleLogin-err: ', err);
    });
  }

  facebookLogin() {
    this.loadingService.show();
    this.authService.doFacebookLogin()
    .then(res => {
      console.log('facebookLogin-res: ', res);
      const signinRequest: SigninRequest = new SigninRequest();
      signinRequest.email = res.additionalUserInfo.profile.email;
      signinRequest.avatar = res.additionalUserInfo.profile.picture.data.url;
      signinRequest.loginType = 'social';
      signinRequest.name = res.additionalUserInfo.profile.name;
      signinRequest.socialName = res.additionalUserInfo.providerId;
      signinRequest.socialToken = res.credential.idToken;
      // signinRequest.userType = res.additionalUserInfo.profile.email;
      this.ngrx.dispatch(new UserAction.TryLogin(signinRequest));
    }, err => {
      this.loadingService.hide();
      console.log('facebookLogin-err: ', err);
    });
  }

}
