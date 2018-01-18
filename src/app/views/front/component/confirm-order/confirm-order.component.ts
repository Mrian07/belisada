import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { Product } from '../../../../core/model/product';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { ProductService } from '../../../../core/service/product/product.service';
import { Checkout } from '../../../../core/model/checkout';
import { LocalStorageService } from '../../../../core/service/storage.service';
import { PaymentMethodDto } from '../../../../core/model/paymentMethodDto';
import { FreightRate } from '../../../../core/model/FreightRate';
import { Store, ActionsSubject } from '@ngrx/store';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { FreightRateService } from '../../../../core/service/freight-rate/freight-rate.service';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BillingAddress } from '../../../../core/model/billing-address';
import { CheckoutService } from '../../../../core/service/checkout/checkout.service';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  private storage: Storage;

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;

  private cartSubscription: Subscription;

  paymentMethodDtos: PaymentMethodDto[];
  subscription: Subscription;
  checkout: Checkout;
  paymentMethodId: any;
  itemsTotal: number;
  deliveryTotal: number;
  grossTotal: number;

  freightRate: FreightRate = new FreightRate();
  freightRates: FreightRate[];

  shippingAddress: ShippingAddress = new ShippingAddress();
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress = new BillingAddress();
  billingAddressList: BillingAddress[];

  constructor(
    private router: Router,
    private title: Title,
    private storageService: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.PaymentMethods>,
    private freightRateService: FreightRateService,
    private shippingAddressService: ShippingAddressService,
    private bilingAddressService: BilingAddressService,
    private checkoutService: CheckoutService
  ) {
    this.storage = this.storageService.get();
  }

  ngOnInit() {
    this.title.setTitle('Belisada - Confirm Order');

    this.subscription = this.actionsSubject
      .asObservable()
      .filter(action => action.type === frontActions.GET_PAYMENT_METHOD_SUCCESS)
      .subscribe((action: frontActions.GetPaymentMethodSuccess) => {
        this.getPaymentMethods();
      }
    );

    this.checkout = this.getCheckout();

    this.getShippingAddress();
    this.getBillingAddress();
    this.shoppingCart();
  }

  getCheckout() {
    const checkout = new Checkout();
    const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
    if (storedCheckout) {
      checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  getPaymentMethods() {
    this.store.select<any>(fromProduct.getPaymentMethodState).subscribe(datas => {
      this.paymentMethodDtos = datas;
    });
  }

  getShippingAddress() {
    this.shippingAddressService.getAll().subscribe(datas => {
      this.shippingAddress = datas.find((x) => x.addressId === this.checkout.shippingAddress);
      this.freightRateService.getFreightRates(this.shippingAddress.villageId).subscribe(response => {
        this.freightRate = response.find((x) => x.shipperId === this.checkout.courierId);
        console.log('this.freightRate: ', this.freightRate);
      });
    });
  }

  getBillingAddress() {
    this.bilingAddressService.getAll().subscribe(datas => {
      this.billingAddress = datas.find((x) => x.addressId === this.checkout.billingAddress);
    });
  }

  shoppingCart() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.itemsTotal = cart.itemsTotal;
      this.deliveryTotal = cart.deliveryTotal;
      this.grossTotal = cart.grossTotal;
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

  prev() {
    this.router.navigateByUrl('/payment-method');
  }

  finish() {
    this.checkout.grandTotal = this.grossTotal;
    console.log('this.checkout: ', this.checkout);
    this.checkoutService.doCheckout(this.checkout).subscribe(response => {
      console.log('response: ', response);
      if (response.status === '1') {
        this.router.navigateByUrl('/finish-order');
      } else {
        swal(response.message);
      }
    });
    // this.router.navigateByUrl('/finish-order');
  }
}
