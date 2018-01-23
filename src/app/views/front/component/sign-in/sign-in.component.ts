import { ShareService } from './../../../../core/service/shared.service';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { LoginData } from '../../../../core/model/login';
import { LoginService } from '../../../../core/service/login/login.service';
import { SendEmailService } from '../../../../core/service/sendEmail/send-email.service';
import { TokenService } from '../../../../core/service/token/token.service';
import { Title } from '@angular/platform-browser';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { LocalStorageService } from '../../../../core/service/storage.service';

const CART_KEY = 'cart';
const CART_POST_KEY = 'cartpost';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private storage: Storage;

  email: string;
  password: string;
  returnUrl: string;
  loading = false;
  token: string;
  isReady: Boolean = false;

  constructor(
    private storageService: LocalStorageService,
    private http: HttpClient,
    private loginService: LoginService,
    private socialAuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sendEmailService: SendEmailService,
    private tokenService: TokenService,
    private title: Title,
    private shared: ShareService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.storage = this.storageService.get();
  }

  ngOnInit() {
    this.title.setTitle('Belisada - Login');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.shared.shareData || 'buyer/test';
    if (this.tokenService.getToken() === undefined) {
    } else {
      // this.router.navigateByUrl('/');
    }
  }

  login() {
    this.loading = true;
    const loginData = {
      username : this.email,
      password : this.password
    };

    this.loginService.doLogin(loginData).subscribe(data => {
      if (data.status === '0') {
        swal( 'Error!', data.message, 'error' );
        this.loading = false;
      } else if (data.status === '2') {
        swal({
          title: 'Warning',
          text: data.message,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Kirim ulang email aktivasi'
        }).then((result) => {
          if (result.value) {
            this.sendEmailService.SendEmail({
              email : this.email,
              type: 'activation'
            }).subscribe(response => {
              swal({
                type: 'success',
                title: response.message,
                showConfirmButton: false
              });
            });
          }
        });
        this.loading = false;
      } else {
        this.loginService.user = data;
        localStorage.user = JSON.stringify(data);
        this.setCartToLocalStorage();
        // this.router.navigate([this.returnUrl]);
        this.router.navigateByUrl('/');
      }
    });
  }

  setCartToLocalStorage() {
    console.log('setCartToLocalStorage');
    const cart = new ShoppingCart();
    this.shoppingCartService.getSingleResult().subscribe(response => {
      cart.grossTotal = response.grossTotal;
      cart.deliveryTotal = response.deliveryTotal;
      cart.itemsTotal = response.itemsTotal;

      response.items.forEach((item, index) => {
        const cartItem = new CartItem();
        cartItem.itemCartId = item.itemCartId;
        cartItem.productId = item.productId;
        cartItem.quantity = item.quantity;
        cart.items.push(cartItem);
        console.log('cart_loop', cart);
      });
      this.storage.setItem(CART_KEY, JSON.stringify(new ShoppingCart()));
      this.storage.setItem(CART_POST_KEY, JSON.stringify(cart));
      this.shoppingCartService.dispatch(cart);
      console.log('jalan dulu gak ni?');
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + 'sign in data : ' , userData);
      }
    );
  }
}
