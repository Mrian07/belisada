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

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  private storage: Storage;

  shippingMethod: any = '';

  paymentMethodDtos: PaymentMethodDto[];
  freightRates: FreightRate[];
  subscription: Subscription;

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

    const checkout = this.getCheckout();

    this.freightRateService.getFreightRates(checkout.shippingAddress).subscribe(response => {
      this.freightRates = response;
      console.log('this.freightRates: ', this.freightRates);
    });
  }

  getPaymentMethods() {
    this.store.select<any>(fromProduct.getPaymentMethodState).subscribe(datas => {
      this.paymentMethodDtos = datas;
    });
  }

  selectShippingMethod(shippingMethodId) {
    console.log('shippingMethodId: ', shippingMethodId);
    if (shippingMethodId !== '') {
      this.shoppingCartService.setDeliveryOption(+shippingMethodId);
    } else {
      console.log('aaaaaa');
    }
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    this.router.navigateByUrl('/confirm-order');
  }

}
