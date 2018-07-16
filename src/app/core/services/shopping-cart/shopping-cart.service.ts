import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ShoppingCart } from '@belisada/core/models/shopping-cart/shopping-cart.model';
import { DeliveryOption } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { StorageService } from '@belisada/core/services/local-storage/storage.service';
import { ProductService } from '@belisada/core/services/product/product.service';
import { CartItem } from '@belisada/core/models/shopping-cart/cart-item.model';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  // private product: ProductDetailSimple[];
  // private deliveryOptions: DeliveryOption[];

  public constructor(private storageService: StorageService,
                     private productService: ProductService,
                     private routes: Router) {
    this.storage = this.storageService.get();
    // this.productService.all().subscribe((products) => this.products = products);
    // this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);

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
      // cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart, (modifiedCart, prod) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);

      console.log('prod: ', prod);
      console.log(prod + ' ---- ' + productId);

      if (prod.productId === productId) {
        this.popupSuccess(prod);
      }
    });
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    // cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  private calculateCart(cart: ShoppingCart, calculateCartCb): void {
    cart.itemsTotal = 0;
    cart.deliveryTotal = 0;
    cart.grossTotal = 0;

    cart.items.forEach((item, index) => {
      this.productService.get(item.productId)
      .subscribe(productResponse => {
        const product = productResponse.data;
        product.weight = (product.weight === 0) ? 1 : product.weight;
        // console.log('product.weight: ', product.weight);
        cart.itemsTotal += item.quantity * product.pricelist;
        cart.deliveryTotal +=
          (cart.freightRate === undefined) ? 0 : cart.freightRate.amount * item.quantity * product.weight;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
        if (index === (cart.items.length - 1)) {
          return calculateCartCb(cart, product);
        } else {
          return;
        }
      });
    });

    // cart.itemsTotal = cart.items
    //                       .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
    //                       .reduce((previous, current) => previous + current, 0);
    // cart.deliveryTotal = cart.deliveryOptionId ?
    //                       this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
    //                       0;
    // cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private popupSuccess(prod) {
    swal({
      // title: prod.name,
      html:
        `<div class="add-to-card-info">
          <div class="">
            <img class="ui image" src="` + prod.imageUrl + `"/>
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
      console.log('result: ', result);
      // if (result === 'cancel') {

      // } else {
      //   this.routes.navigateByUrl('/cart');
      // }

    });
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
