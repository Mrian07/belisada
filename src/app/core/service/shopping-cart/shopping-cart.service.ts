import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ShoppingCart } from '../../model/shoppingcart/shoppnig-cart';
import { Product } from '../../model/product';
import { DeliveryOption } from '../../model/shoppingcart/delivery-option';
import { LocalStorageService } from '../storage.service';
import { CartItem } from '../../model/shoppingcart/cart-item';
import { ProductService } from '../product/product.service';
const CART_KEY = 'cart';

@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  private deliveryOptions: DeliveryOption[];

  public constructor(private storageService: LocalStorageService, private productService: ProductService) {
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
    }

    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart, (modifiedCart) => {
      this.save(modifiedCart);
      this.dispatch(modifiedCart);
    });
  }

  private calculateCart(cart: ShoppingCart, cb) {
    const promise = new Promise((resolve, reject) => {
      cart.items.forEach(item => {
        this.productService.get(item.productId).subscribe(response => {
          cart.itemsTotal += item.quantity * response.pricelist;
          resolve(true);
        });
      });
    }).then(() => {
      console.log('cart.itemsTotal: ', cart.itemsTotal);
      cart.deliveryTotal = cart.deliveryOptionId ? this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price : 0;
      cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
      console.log('cart.grossTotal: ', cart.grossTotal);
      cb(cart);
    });
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: ShoppingCart): void {
    console.log('cart: ', cart);
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
