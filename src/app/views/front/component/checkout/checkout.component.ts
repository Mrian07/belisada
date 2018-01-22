import { Component, OnInit, NgZone } from '@angular/core';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { BillingAddress } from '../../../../core/model/billing-address';
import { Title } from '@angular/platform-browser';
import { ShareService } from '../../../../core/service/shared.service';

import { LocalStorageService } from '../../../../core/service/storage.service';
import { FreightRate } from '../../../../core/model/FreightRate';
import { FreightRateService } from '../../../../core/service/freight-rate/freight-rate.service';
import { Checkout } from '../../../../core/model/checkout';
import { Product } from '../../../../core/model/product';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems;
  cart;
  paymentMethodDtos;
  paymentMethodId;
  shippingMethod;
  freightRates;
  deliveryTotal;
  freightRate;
  // deliveryTotal;
  itemsTotal;
  grossTotal;
  // shippingMethod;
  // freightRates;
  selectShippingMethod;


  private storage: Storage;
  checkout: Checkout;
  shippingAddress: ShippingAddress;
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress;
  billingAddressList: BillingAddress[];

  selShippingAddress: any = '';
  selBillingAddress: any = '';

  billing: Boolean = false;

  // freightRate: FreightRate = new FreightRate();
  // freightRates: FreightRate[];

  // statusAddBilling: Boolean = false;
  // showDataBilling: Boolean = true;
  // statusAddShipping: Boolean = false;
  // showDataShipping: Boolean = true;

  constructor(
    private shippingAddressService: ShippingAddressService,
    private ngZone: NgZone,
    private title: Title,
    private shareService: ShareService,
    private bilingAddressService: BilingAddressService,
    private freightRateService: FreightRateService,
    private storageService: LocalStorageService,
  ) {
    this.storage = this.storageService.get();
   }

  ngOnInit() {
    this.title.setTitle('Belisada - Checkout');
    this.getAllShippingAddress();
    this.getRate();
    this.checkout = this.getCheckout();
    this.bilingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.billingAddressList = this.shareService.shareData;
        if (this.billingAddressList.length === 0) {
          this.billing = true;
        }
        console.log('this.billingAddressList: ', this.billingAddressList);
      });
    });
  }

  // addBilling(data) {
  //   console.log('ini', data);
  //   if (data === 'add') {
  //     this.statusAddBilling = true;
  //     this.showDataBilling = false;
  //   } else {
  //     this.statusAddBilling = false;
  //   }
  // }

  // addShipping(data) {
  //   console.log('ini', data);
  //   if (data === 'add') {
  //     this.statusAddShipping = true;
  //     this.showDataShipping = false;
  //   } else {
  //     this.statusAddShipping = false;
  //   }
  // }


  getAllShippingAddress() {
    this.shippingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.shippingAddressList = this.shareService.shareData;
      });
    });
  }

  getCheckout() {
    const checkout = new Checkout();
    const storedCheckout = this.storage.getItem(CHECKOUT_KEY);
    if (storedCheckout) {
      checkout.updateFrom(JSON.parse(storedCheckout));
    }
    return checkout;
  }

  getShippingAddress(selShippingAddress) {
    this.shippingAddress = this.shippingAddressList.find(x => x.addressId === +selShippingAddress);
  }

  getBillingAddress(selBillingAddress) {
    this.billingAddress = this.billingAddressList.find(x => x.addressId === +selBillingAddress);
  }

  getRate() {
    this.shippingAddressService.getAll().subscribe(datas => {
      this.shippingAddress = datas.find((x) => x.addressId === this.checkout.shippingAddress);
      this.freightRateService.getFreightRates(this.shippingAddress.villageId).subscribe(response => {
        this.freightRate = response.find((x) => x.shipperId === this.checkout.courierId);
        console.log('this.freightRate: ', this.freightRate);
      });
    });
  }
}
