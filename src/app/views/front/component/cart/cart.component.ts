import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { ProductService } from '../../../../core/service/product/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../../core/model/product';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  itemsTotal: number;

  private cartSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Your Cart');
    window.scrollTo(0, 0);
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

  public updateQuantity(event: any, item: any) {
    let quantity = 0;

    if (item.quantity > event.target.value) {
      quantity = -(item.quantity - event.target.value);
    } else {
      quantity = +(event.target.value - item.quantity);
    }
    this.shoppingCartService.updateQuantity(item.product.productId, quantity);
  }

  public removeProductFromCart(productId: number, quantity: number): void {
    this.shoppingCartService.addItem(productId, -quantity);
  }

  next() {
    this.router.navigateByUrl('/shipping');
  }
}
