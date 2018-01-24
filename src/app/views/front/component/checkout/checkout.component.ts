import swal from 'sweetalert2';
import { Component, OnInit, NgZone } from '@angular/core';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { BillingAddress } from '../../../../core/model/billing-address';
import { Title } from '@angular/platform-browser';
import { ShareService } from '../../../../core/service/shared.service';
import * as frontActions from '../../../../store/actions/front';
import * as fromProduct from '../../../../store/reducers';
import { LocalStorageService } from '../../../../core/service/storage.service';
import { FreightRate } from '../../../../core/model/FreightRate';
import { FreightRateService } from '../../../../core/service/freight-rate/freight-rate.service';
import { Checkout } from '../../../../core/model/checkout';
import { Product } from '../../../../core/model/product';
import { CartItem } from '../../../../core/model/shoppingcart/cart-item';
import { ShoppingCartService } from '../../../../core/service/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../../../core/model/shoppingcart/shoppnig-cart';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../../core/service/product/product.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { PaymentMethodDto } from '../../../../core/model/paymentMethodDto';
import { PaymentMethod } from '../../../../core/model/PaymentMethod';
import { PaymentMethodDetail } from '../../../../core/model/PaymentMethodDetail';
import { CheckoutService } from '../../../../core/service/checkout/checkout.service';
import { Router } from '@angular/router';


interface ICartItemWithProduct extends CartItem {
  product: Product;
  arrStock: number[];
  totalCost: number;
}

const CHECKOUT_KEY  = 'checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[] = [];
  public itemCount: number;
  itemsTotal: number;

  private cartSubscription: Subscription;

  subscription: Subscription;
  paymentMethodDtos: PaymentMethodDto[];
  paymentMethodDto: PaymentMethodDto = new PaymentMethodDto();
  paymentMethod: PaymentMethod = new PaymentMethod();
  paymentMethodDetail: PaymentMethodDetail = new PaymentMethodDetail();
  paymentMethodId;
  shippingMethod = '';
  freightRates;
  deliveryTotal: number;
  grossTotal: number;
  freightRate: FreightRate = new FreightRate();


  private storage: Storage;
  checkout: Checkout;
  shippingAddress: ShippingAddress;
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress;
  billingAddressList: BillingAddress[];

  selShippingAddress: any = '';
  selBillingAddress: any = '';
  kampret;
  kampre2t;
  billing: Boolean = false;

  constructor(
    private shippingAddressService: ShippingAddressService,
    private ngZone: NgZone,
    private title: Title,
    private router: Router,
    private shareService: ShareService,
    private bilingAddressService: BilingAddressService,
    private freightRateService: FreightRateService,
    private storageService: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.PaymentMethods>,
    private checkoutService: CheckoutService
  ) {
    this.storage = this.storageService.get();
    this.store.dispatch(new frontActions.GetPaymentMethod());
   }

  ngOnInit() {
    this.kampret = false;
    this.title.setTitle('Belisada - Checkout');
    this.getAllShippingAddress();
    this.checkout = this.getCheckout();
    this.bilingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.billingAddressList = this.shareService.shareData;
        console.log('kaka', this.billingAddressList);
        // console.log('asdasd', token);
        console.log('apaan si nih', this.billingAddress );
          if (this.billingAddressList.length === 0) {
          this.kampret = true;
        } else {
          this.kampre2t = true;
        }
        if (this.billingAddressList.length === 0) {
          this.billing = true;
        }
        console.log('this.billingAddressList: ', this.billingAddressList);
      });
    });

    this.subscription = this.actionsSubject
      .asObservable()
        .filter(action => action.type === frontActions.GET_PAYMENT_METHOD_SUCCESS)
          .subscribe((action: frontActions.GetPaymentMethodSuccess) => {
            this.getPaymentMethods();
          });
    this.shoppingCart();
  }

  getPaymentMethods() {
    this.store.select<any>(fromProduct.getPaymentMethodState).subscribe(datas => {
      this.paymentMethodDtos = datas;
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
            arrStock: Array.from(new Array(product.stock), (val, index) => index + 1),
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
    console.log('item: ', item);
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

  selectPaymentMethod(paymentMethodId) {
    console.log('paymentMethodId: ', paymentMethodId);
    const arr = paymentMethodId.split('~');
    const mBankAccountId = arr[0];
    const paymentMethod = arr[1];
    console.log(mBankAccountId + ' - ' + paymentMethod);
    this.paymentMethodDto = this.paymentMethodDtos.find(x => x.paymentMethod.code === paymentMethod);
    this.paymentMethod = this.paymentMethodDto.paymentMethod;
    this.paymentMethodDetail = this.paymentMethodDto.paymentMethodDetails.find(x => x.mBankAccountId === +mBankAccountId);
  }

  selectShippingMethod(shippingMethodId) {
    const courier = this.freightRates.find((x) => x.shipperId === +shippingMethodId);
    console.log('courier: ', courier);
    if (courier) {
      this.checkout.courierId = courier.shipperId;
      this.checkout.courierAmt = courier.amount;
      this.checkout.courierName = courier.shipperName;
      this.checkout.isoncePickup = 'Y';
      this.freightRate = courier;
    } else {
      this.checkout.courierId = -1;
      const fr = new FreightRate();
      fr.shipperName = '';
      this.freightRate = fr;
    }
    this.shoppingCartService.setDeliveryOption(courier);
  }

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
    this.getRate(this.shippingAddress.villageId);
  }

  getBillingAddress(selBillingAddress) {
    this.billingAddress = this.billingAddressList.find(x => x.addressId === +selBillingAddress);
  }

  getRate(villageId) {
    this.freightRateService.getFreightRates(villageId).subscribe(response => {
      this.freightRates = response;
      console.log('this.freightRate: ', this.freightRates);
    });
  }

  finishOrder() {
    this.checkout = new Checkout();
    this.checkout.billingAddress = this.billingAddress.addressId;
    this.checkout.courierAmt = this.freightRate.amount;
    this.checkout.courierId = this.freightRate.shipperId;
    this.checkout.courierName = this.freightRate.shipperName;
    this.checkout.grandTotal = this.grossTotal;
    this.checkout.isoncePickup = 'Y';
    this.checkout.mBankAccountId = this.paymentMethodDetail.mBankAccountId;
    this.checkout.paymentMethod = this.paymentMethod.code;
    this.checkout.shippingAddress = this.shippingAddress.addressId;
    this.checkoutService.doCheckout(this.checkout).subscribe(response => {
      console.log('response: ', response);
      if (response.status === '1') {
        this.shoppingCartService.empty();
      }
      swal(response.message);
      this.router.navigateByUrl('/buyer/dashboard');
    });
  }

  prev() {
    this.router.navigateByUrl('/cart');
  }

}
