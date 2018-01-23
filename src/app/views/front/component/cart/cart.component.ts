import swal from 'sweetalert2';
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
import { TokenService } from '../../../../core/service/token/token.service';


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

  quantities = [1, 2, 3, 4, 5];

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  itemsTotal: number;

  private cartSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private router: Router,
    private title: Title,
    private auth: TokenService,
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Your Cart');
    window.scrollTo(0, 0);

    this.shoppingCart();
    // this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    //   this.itemsTotal = cart.itemsTotal;
    //   this.cartItems = [];
    //   cart.items.forEach(item => {
    //     this.productService.get(item.productId).subscribe((product) => {
    //       // const product = prod;
    //       this.cartItems.push({
    //         ...item,
    //         product,
    //         totalCost: product.pricelist * item.quantity });
    //     });
    //   });
    // });
  }

  shoppingCart() {
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

    const updateData = {
      quantity: event.target.value,
      itemCartId: item.itemCartId
    };

    this.shoppingCartService.update(updateData).subscribe(response => {
      if (response.status === '1') {
        this.shoppingCartService.updateQuantity(item.product.productId, quantity);
      } else {
        swal(response.message);
      }
    });
  }

  public removeProductFromCart(item: CartItem): void {
    swal({
      title: 'Belisada.co.id',
      text: 'Apakah Anda Yakin?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!'
    }).then((result) => {
      if (result.value) {
        this.shoppingCartService.delete(item.itemCartId).subscribe(response => {
          if (response.status === '1') {
            this.shoppingCartService.addItem(item.productId, -item.quantity);
            swal(
              'Dihapus!',
              'Belanjaan Anda berhasil dihapus',
              'success'
            );
          } else {
            swal(response.message);
          }
        });
      }
    });
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }
}
