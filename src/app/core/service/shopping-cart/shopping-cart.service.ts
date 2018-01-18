import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ShoppingCart } from '../../model/shoppingcart/shoppnig-cart';
import { Product } from '../../model/product';
import { DeliveryOption } from '../../model/shoppingcart/delivery-option';
import { LocalStorageService } from '../storage.service';
import { CartItem } from '../../model/shoppingcart/cart-item';
import { ProductService } from '../product/product.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Checkout } from '../../model/checkout';
import { FreightRateService } from '../freight-rate/freight-rate.service';
import { FreightRate } from '../../model/FreightRate';

const CART_KEY = 'cart';
const CHECKOUT_KEY = 'checkout';

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private deliveryOptions: DeliveryOption[];


  public constructor(
    private storageService: LocalStorageService,
    private productService: ProductService,
    private freightRateService: FreightRateService,
    private routes: Router
  ) {
    this.storage = this.storageService.get();
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


  public addItem(productId: number, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
      this.empty();
    }

    this.calculateCart(cart, (modifiedCart, prod, idx, array) => {
      this.save(modifiedCart);
      if (prod.productId === productId) {
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
      if (idx === array.length - 1) {
        this.dispatch(modifiedCart);
      }
    });
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOptionId: number): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOptionId;
    this.calculateCart(cart, (modifiedCart, product, idx, array) => {
      this.save(modifiedCart);
      if (idx === array.length - 1) {
        this.dispatch(modifiedCart);
      }
    });
  }

  public updateQuantity(productId: number, quantity: number) {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === productId);
    if (item === undefined) {
      item = new CartItem();
      item.productId = productId;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart, (modifiedCart, prod, idx, array) => {
      this.save(modifiedCart);
      if (idx === array.length - 1) {
        this.dispatch(modifiedCart);
      }
    });
  }

  private calculateCart(cart: ShoppingCart, cb) {
    cart.itemsTotal = 0;
    cart.deliveryTotal = 0;
    cart.items.forEach((item, idx, array) => {
      this.productService.get(item.productId).subscribe(response => {

        // cart.deliveryTotal = cart.deliveryOptionId ? this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price : 0;
        this.getDeliveryPrice(cart, item, response, () => {
          cb(cart, response, idx, array);
        });
      });
    });
  }

  private getDeliveryPrice(cart, item, product, cb) {
    const checkout = this.retrieveCheckout();
    if (checkout.shippingAddress === undefined) {
      console.log('checkout: ', checkout);
      cart.itemsTotal += item.quantity * product.pricelist;
      cart.deliveryTotal = 0;
      cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;

      cb(cart, cb);
    } else {
      this.freightRateService.getFreightRates(checkout.shippingAddress).subscribe(response => {
        console.log('cart.deliveryOptionId: ', cart.deliveryOptionId);
        console.log('response.find((x) => x.shipperId === cart.deliveryOptionId): ',
        response.find((x) => x.shipperId === cart.deliveryOptionId));
        cart.itemsTotal += item.quantity * product.pricelist;
        cart.deliveryTotal += item.quantity * product.weight * response.find((x) => x.shipperId === cart.deliveryOptionId).amount;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
        cb(cart, cb);
      });
    }
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private retrieveCheckout(): Checkout {
    const checkout = new Checkout();
    const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
    if (storedCheckout) {
      checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
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
