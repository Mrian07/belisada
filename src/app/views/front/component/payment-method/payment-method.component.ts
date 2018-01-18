import swal from 'sweetalert2';
import { PaymentMethods } from './../../../../store/reducers/index';
import { PaymentMethod } from './../../../../core/model/PaymentMethod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethodService } from '../../../../core/service/payment-method/payment-method.service';
import { Title } from '@angular/platform-browser';
import { ActionsSubject, Store } from '@ngrx/store';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { Subscription } from 'rxjs/Subscription';
import { PaymentMethodDto } from '../../../../core/model/paymentMethodDto';
import { FreightRateService } from '../../../../core/service/freight-rate/freight-rate.service';
import { LocalStorageService } from '../../../../core/service/storage.service';
import { ShareService } from '../../../../core/service/shared.service';
import { Checkout } from '../../../../core/model/checkout';
import { FreightRate } from '../../../../core/model/FreightRate';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BillingAddress } from '../../../../core/model/billing-address';

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  private storage: Storage;

  public cart: Observable<ShoppingCart>;
  public deliveryTotal: number;
  private cartSubscription: Subscription;

  shippingMethod: any = '';

  paymentMethodDtos: PaymentMethodDto[];
  freightRates: FreightRate[];
  subscription: Subscription;
  checkout: Checkout;
  paymentMethodId: any;

  shippingAddress: ShippingAddress = new ShippingAddress();
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress = new BillingAddress();
  billingAddressList: BillingAddress[];

  constructor(
    private router: Router,
    private title: Title,
    private storageService: LocalStorageService,
    private paymentMethodService: PaymentMethodService,
    private freightRateService: FreightRateService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.PaymentMethods>,
    private shared: ShareService,
    private shoppingCartService: ShoppingCartService,
    private shippingAddressService: ShippingAddressService,
    private bilingAddressService: BilingAddressService,
  ) {
    this.storage = this.storageService.get();
    this.store.dispatch(new frontActions.GetPaymentMethod());
  }

  getCheckout() {
   const checkout = new Checkout();
    const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
    if (storedCheckout) {
      checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  ngOnInit() {
    this.title.setTitle('Belisada - Payment Method');
    console.log('shared:', this.shared.shareData);
    this.subscription = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GET_PAYMENT_METHOD_SUCCESS)
    .subscribe((action: frontActions.GetPaymentMethodSuccess) => {
      this.getPaymentMethods();
    });

    this.checkout = this.getCheckout();

    this.getShippingAddress();
    this.shoppingCart();
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
        this.freightRates = response;
        console.log('this.freightRates: ', this.freightRates);
      });
    });
  }

  getBillingAddress() {
    this.bilingAddressService.getAll().subscribe(datas => {
      this.billingAddress = datas.find((x) => x.addressId === this.checkout.billingAddress);
    });
  }

  selectShippingMethod(shippingMethodId) {
    const courier = this.freightRates.find((x) => x.shipperId === +shippingMethodId);
    console.log('courier: ', courier);
    if (courier) {
      this.checkout.courierId = courier.shipperId;
      this.checkout.courierAmt = courier.amount;
      this.checkout.courierName = courier.shipperName;
      this.checkout.isoncePickup = 'Y';
    } else {
      this.checkout.courierId = -1;
    }
    this.shoppingCartService.setDeliveryOption(+shippingMethodId);
  }

  shoppingCart() {
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.deliveryTotal = cart.deliveryTotal;
    });
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    if (this.paymentMethodId) {
      const arr = this.paymentMethodId.split('~');
      this.checkout.mBankAccountId = arr[0];
      this.checkout.paymentMethod = arr[1];
    } else {
      this.checkout.mBankAccountId = -1;
    }


    if (this.checkout.courierId && this.checkout.mBankAccountId) {
      this.storage.setItem(CHECKOUT_KEY, JSON.stringify(this.checkout));
      this.router.navigateByUrl('/confirm-order');
    } else {
      swal('Pastikan payment method dan kirir pengiriman terpilih');
    }
    console.log('this.checkout: ', this.checkout);
    // this.router.navigateByUrl('/confirm-order');
  }

}
