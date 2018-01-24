import { switchMap } from 'rxjs/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ShoppingCart } from '../../model/shoppingcart/shoppnig-cart';
import { Product } from '../../model/product';
import { DeliveryOption } from '../../model/shoppingcart/delivery-option';
import { LocalStorageService } from '../storage.service';
import { CartItem, CartItemResponse } from '../../model/shoppingcart/cart-item';
import { ProductService } from '../product/product.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Checkout } from '../../model/checkout';
import { FreightRateService } from '../freight-rate/freight-rate.service';
import { FreightRate } from '../../model/FreightRate';
import { ShippingAddress } from '../../model/shipping-address';
import { ShippingAddressService } from '../shipping-address/shipping-address.service';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { TokenService } from '../token/token.service';

const CART_KEY = 'cart';
const CART_POST_KEY = 'cartpost';
const CHECKOUT_KEY = 'checkout';

@Injectable()
export class ShoppingCartService extends AbstractRestService<CartItemResponse> {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private deliveryOptions: DeliveryOption[];
  private user: any;

  shippingAddress: ShippingAddress = new ShippingAddress();
  shippingAddressList: ShippingAddress[];


  public constructor(
    private http: HttpClient,
    private configuration: Configuration,
    private storageService: LocalStorageService,
    private productService: ProductService,
    private freightRateService: FreightRateService,
    private shippingAddressService: ShippingAddressService,
    private routes: Router,
    private tokenService: TokenService
  ) {
    super(http, configuration.serverWithAccUrl + '/buyer/order/cart');

    this.storage = this.storageService.get();
    this.user = this.tokenService.getUser();
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(productId: number, quantity: number, itemCartId?: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      if (itemCartId) {
        item.itemCartId = itemCartId;
      }
      cart.items.push(item);
    }
    console.log(console.log('cart: ', cart));
    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.freightRate = undefined;
      this.empty();
    }

    this.calculateCart(cart, (modifiedCart, prod) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);

      if (prod.productId === productId) {
        this.popupSuccess(prod);
      }
    });
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.storage.setItem(CART_KEY, JSON.stringify(newCart));
    this.storage.setItem(CART_POST_KEY, JSON.stringify(newCart));
    // this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(freightRate: FreightRate): void {
    console.log('freightRate: ', freightRate);
    const cart = this.retrieve();
    cart.freightRate = freightRate;
    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  public updateQuantity(productId: number, quantity: number) {
    const cart = this.retrieve();
    console.log(cart);
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.freightRate = undefined;
    }

    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  private calculateCart(cart: ShoppingCart, calculateCartCb) {
    console.log('calculateCart: ', cart);
    cart.itemsTotal = 0;
    cart.deliveryTotal = 0;
    cart.items.forEach((item, index) => {
      this.productService.get(item.productId)
      .subscribe(product => {
        cart.itemsTotal += item.quantity * product.pricelist;
        cart.deliveryTotal += (cart.freightRate === undefined) ? 0 : cart.freightRate.amount * item.quantity * product.weight;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
        if (index === (cart.items.length - 1)) {
          return calculateCartCb(cart, product);
        } else {
          return;
        }
      });
    });
  }

  // private getDeliveryPrice(cart, item, product, cb) {
  //   const checkout = this.retrieveCheckout();
  //   if (checkout.shippingAddress === undefined) {
  //     console.log('checkout: ', checkout);
  //     cart.itemsTotal += item.quantity * product.pricelist;
  //     cart.deliveryTotal = 0;
  //     cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;

  //     cb(cart, cb);
  //   } else {
  //     this.shippingAddressService.getAll().subscribe(datas => {
  //       this.shippingAddress = datas.find((x) => x.addressId === checkout.shippingAddress);

  //       this.freightRateService.getFreightRates(this.shippingAddress.villageId).subscribe(response => {
  //         if (cart.deliveryOptionId === 0) {
  //           cart.deliveryTotal = 0;
  //         } else {
  //           cart.deliveryTotal += (item.quantity * product.weight * response.find((x) => x.shipperId === cart.deliveryOptionId).amount);
  //         }
  //         console.log('item: ', item);
  //         console.log('product: ', product);
  //         console.log('cart.deliveryOptionId: ', cart.deliveryOptionId);
  //         console.log('response.find((x) => x.shipperId === cart.deliveryOptionId): ',
  //         response.find((x) => x.shipperId === cart.deliveryOptionId));
  //         cart.itemsTotal += item.quantity * product.pricelist;
  //         // cart.deliveryTotal += item.quantity * product.weight * response.find((x) => x.shipperId === cart.deliveryOptionId).amount;
  //         cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  //         console.log('cart.deliveryTotal: ', cart.deliveryTotal);
  //         cb(cart, cb);
  //       });
  //     });
  //   }
  // }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem((this.tokenService.getUser()) ? CART_POST_KEY : CART_KEY);

    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  public retrievePostLogin(cbSuccess) {
    const cart = new ShoppingCart();
    this.getSingleResult().subscribe(response => {
      cart.grossTotal = response.grossTotal;
      cart.deliveryTotal = response.deliveryTotal;
      cart.itemsTotal = response.itemsTotal;

      response.items.forEach((item, index) => {
        const cartItem = new CartItem();
        cartItem.productId = item.productId;
        cartItem.quantity = item.quantity;
        cart.items.push(cartItem);
        console.log('cart_loop: ', cart);
        if (index === (response.items.length - 1)) {
          return cbSuccess(cart);
        } else {
          return;
        }
      });
    });

    // return this.getSingleResult().switchMap(response => {
    //   cart.grossTotal = response.grossTotal;
    //   cart.deliveryTotal = response.deliveryTotal;
    //   cart.itemsTotal = response.itemsTotal;
    //   return Observable.of(response.items);
    // })
    //   .switchMap(items => items)
    //     .map(item => item)
    //       .switchMap((item) => {
    //         const cartItem = new CartItem();
    //         cartItem.productId = item.productId;
    //         cartItem.quantity = item.quantity;
    //         cart.items.push(cartItem);
    //         console.log('cartPostLogin: ', cart);
    //         return Observable.of(cart);
    //       });
  }
  // cart.grossTotal = response.grossTotal;
  // cart.deliveryTotal = response.deliveryTotal;
  // cart.itemsTotal = response.itemsTotal;

  private retrieveCheckout(): Checkout {
    const checkout = new Checkout();
    const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
    if (storedCheckout) {
      checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  public popupSuccess(prod) {
    swal({
      // title: prod.name,
      html:
        `<div class="add-to-card-info">
          <div class="">
            <img class="ui image" src="` + prod.imageurl + `"/>
          </div>
          <div class="detail-add-to-cart">
            <div class="detail-add-to-cart-container">
              <span class="name-added-to-cart">` + prod.name + `</span>
              <span class="added-to-cart">WAS ADDED TO YOUR CART</span>
            </div>
          </div>
        </div>
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      buttonsStyling: false,
      confirmButtonClass: 'bs-btn btn-modal-view-cart',
      cancelButtonClass: 'bs-btn btn-modal-contionue-shopping',
      confirmButtonText:
        `View Cart`,
      cancelButtonText:
        `Continue to Shop`,
    }).then((result) => {
      if (result.dismiss === 'cancel') {

      } else {
        this.routes.navigateByUrl('/cart');
      }

    });
  }

  private save(cart: ShoppingCart): void {
    // console.log('this.user: ', this.user);
    this.storage.setItem((this.tokenService.getUser()) ? CART_POST_KEY : CART_KEY, JSON.stringify(cart));
  }

  public dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }
}
