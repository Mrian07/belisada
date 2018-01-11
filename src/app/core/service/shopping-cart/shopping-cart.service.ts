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

    this.calculateCart(cart, (modifiedCart, prod, idx, array) => {
      this.save(modifiedCart);
      // if (prod.productId === productId) {
      //   swal({
      //     // title: prod.name,
      //     html:
      //       `<div class="pull-left"><img class="ui image" src="` + prod.imageurl + `"></div>
      //       <div class="pull-left">` + prod.name + `</div>`,
      //     imageWidth: 400,
      //     imageHeight: 200,
      //     showCloseButton: true,
      //     showCancelButton: true,
      //     focusConfirm: false,
      //     confirmButtonText:
      //       '<i class="fa fa-thumbs-up"></i> Great!',
      //     confirmButtonAriaLabel: 'Thumbs up, great!',
      //     cancelButtonText:
      //     '<i class="fa fa-thumbs-down"></i>',
      //     cancelButtonAriaLabel: 'Thumbs down',
      //   }).then((result) => {
      //     console.log('result: ', result);
      //   });
      // }
      if (idx === array.length - 1) {
        swal('Produk berhasil ditambahkan ke keranjang');
        this.dispatch(modifiedCart);
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
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart, (modifiedCart, product, idx, array) => {
      this.save(modifiedCart);
      if (idx === array.length - 1) {
        this.dispatch(modifiedCart);
      }
    });
  }

  private calculateCart(cart: ShoppingCart, cb) {
    cart.itemsTotal = 0;
    cart.items.forEach((item, idx, array) => {
      this.productService.get(item.productId).subscribe(response => {
        cart.itemsTotal += item.quantity * response.pricelist;
        cart.deliveryTotal = cart.deliveryOptionId ? this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price : 0;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
        cb(cart, response, idx, array);
      });
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
