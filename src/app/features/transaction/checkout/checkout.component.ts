import { AddShippingRequest, GetShippingResponse } from '@belisada/core/models/address/address.model';
import { AddressService } from './../../../core/services/address/address.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { StoreService } from '@belisada/core/services';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { Payment, PaymentList, Ipay88Req } from '@belisada/core/models/payment/payment.model';
import { ShoppingCartService } from '@belisada/core/services/shopping-cart/shopping-cart.service';
import { CheckoutTrx, UpdateShippingReq, UpdateAsuransiReq } from '@belisada/core/models/checkout/checkout-cart';
import { ShippingRate } from '@belisada/core/models/shopping-cart/delivery-option.model';
import { CheckoutService } from '@belisada/core/services/checkout/checkout.service';
import { CheckoutReq, CheckoutShippingAddress } from '@belisada/core/models/checkout/checkout-transaction';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ThumborService } from '@belisada/core/services/thumbor/thumbor.service';
import { ThumborOptions } from '@belisada/core/services/thumbor/thumbor.options';
import { ThumborSizingEnum } from '@belisada/core/services/thumbor/thumbor.sizing.enum';
import { environment } from '@env/environment';
import { LocalStorageEnum } from '@belisada/core/enum';
import { UserService, Globals } from '@belisada/core/services';

declare var iPay88Signature: any;

import { HttpClient, HttpParams } from '@angular/common/http';
// import { CheckoutModel } from '@belisada/core/models/checkout/checkout-transaction';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('f') f;

  ipay88Req: Ipay88Req = new Ipay88Req();

  // ![(ngModel)]
  checkoutAddress: any = '';
  rates = [];
  shippingAddressDatas = [];
  shippingRates: string[];
  notes: string[];
  checkShop: any[];
  isInsurance: any[];
  itemCartIds: number[];
  shippingAddresses: any[];

  public formAddCrtl: FormGroup;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  showDialogPilihAlamat: Boolean = false;
  simpan_sebagai: FormControl;
  penerima: FormControl;
  hp: FormControl;
  kodepos: FormControl;
  alamat: FormControl;

  listShip: GetShippingResponse[];
  listPayment: Payment[];
  listPaymentChild: Payment[];
  payment: Payment[];

  selectedShippingAddress: CheckoutShippingAddress = new CheckoutShippingAddress();
  checkoutShippingAddress: CheckoutShippingAddress[];

  isPayment: boolean;
  isNote: boolean;
  isAny0Qty: Boolean = false;

  isTransfer: boolean[];
  isTransferBank: Boolean = false;
  PMCode: string;

  checkoutTrx: CheckoutTrx = new CheckoutTrx;

  isBtnTransfer: Boolean = false;
  isBtnCart: Boolean = false;
  loadingRates: boolean[];

  userName: string;
  userEmail: string;
  userContact: string;

  showDialog;
  createForm: FormGroup;

  // channelId: number;
  channelId = 2;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService,
    private addressService: AddressService,
    private paymentService: PaymentService,
    private shoppingCartService: ShoppingCartService,
    private checkoutService: CheckoutService,
    private thumborService: ThumborService,
    private http: HttpClient,
    private _userService: UserService,
  ) {

    this.isTransfer = [];
    this.itemCartIds = [];
    this.shippingRates = [];
    this.loadingRates = [];
    this.notes = [];
    this.checkShop = [];
    this.isInsurance = [];
    this.shippingAddresses = [];
    this.checkoutShippingAddress = [];

    this.form();
    this.fillForms();
  }

  MerchantCode: string;
  PaymentId: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  ProdDesc: string;
  UserName: string;
  UserEmail: string;
  UserContact: string;
  Remark: string;
  Lang: string;
  signature: string;
  ResponseURL: string;
  BackendURL: string;

  form() {
    this.createForm = this.fb.group({
      MerchantCode: new FormControl('', Validators.required),
      PaymentId: new FormControl('', Validators.required),
      RefNo: new FormControl('', Validators.required),
      Amount: new FormControl('', Validators.required),
      Currency: new FormControl('', Validators.required),
      ProdDesc: new FormControl('', Validators.required),
      UserName: new FormControl('', Validators.required),
      UserEmail: new FormControl('', Validators.required),
      UserContact: new FormControl('', Validators.required),
      Remark: new FormControl('', Validators.required),
      Lang: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      ResponseURL: new FormControl('', Validators.required),
      BackendURL: new FormControl('', Validators.required),
    });
  }

  fillForms() {
    this.createForm.patchValue(
      {
        MerchantCode: environment.ipay88.MerchantCode,
        PaymentId: '1',
        RefNo: '',
        Amount: '',
        Currency: '',
        ProdDesc: '',
        UserName: '',
        UserEmail: '',
        UserContact: '',
        Remark: '',
        Lang: '',
        signature: '',
        ResponseURL: '',
        BackendURL: '',
      });
  }

  ngOnInit() {
    console.log('[CART] CHECKOUT PAGE');
    this.isNote = false;
    this.isPayment = false;
    this.getCartCheckout();
    this.formAdd();
    this.getProvince();
    this.onChanges();
    this.dataShipping();
    this.allPayment();
  }

  getCartCheckout() {

    this.cekShipping();

    this.shoppingCartService.getCartV2().subscribe(response => {
      this.checkoutTrx = response;

      response.cart.forEach((item, i) => {
        this.checkShop[i] = true;
        this.loadingRates.push(false);
      });

      console.log('response', response);

      response.cart.forEach((cart, index) => {
        this.notes[index] = cart.note;
        this.isInsurance[index] = cart.useAsuransi;

        cart.cartItems.forEach((item, i) => {
          if (item.qty === 0) { this.isAny0Qty = true; }
          const option = {
            width: 150,
            height: 150,
            fitting: ThumborSizingEnum.FIT_IN,
            filter: {
              fill: 'fff'
            }
          };
          const newImgUrl = this.thumborService.process(item.imageUrl, option);
          this.checkoutTrx.cart[index].cartItems[i].imageUrl = newImgUrl;
        });

        cart.itemCartIds.forEach((item) => {
          if (this.itemCartIds.indexOf(item) === -1) { this.itemCartIds.push(item); }
        });

        this.shippingAddresses[index] =
          (cart.shippingAddressId === 0) ? 0 :
            (cart.destinations.some(x => x.shippingAddressId === cart.shippingAddressId)) ? cart.shippingAddressId : 0;

        const queryParam = {
          itemCartIds: cart.itemCartIds,
          originId: cart.originId,
          destinationId: cart.destinationId,
          weight: cart.totalWeight
        };
        this.getShippingRates(queryParam, index, () => {
          this.shippingRates[index] = (cart.courierCode === '') ? '' :
            (this.rates[index].some(
              x => x.courierCode + '~' + x.courierService === cart.courierCode + '~' + cart.courierService))
                ? cart.courierCode + '~' + cart.courierService : '';
          this.shippingAddressDatas[index] = cart.destinations.find(x => x.shippingAddressId === cart.shippingAddressId);
          this.loadingRates[index] = false;
        });
      });
    });
  }

  cekShipping() {
    this.addressService.getShipping().subscribe(respon => {
        if (respon.length === 0) {
            this.showDialog = true;
        }
      });
  }

  allPayment() {
    this.paymentService.getPayment().subscribe(respon => {
    this.listPayment = respon;
    this.listPayment.forEach((item, i) => {
        this.isTransfer[i] = false;
      });
    });
  }

  byTransfer() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
      // this.listPayment = respon[0].data;
    });
  }

  byCart() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
    // this.listPayment = respon[1].data;
    });
  }

  byInstan() {
    this.isPayment = true;
    this.paymentService.getPayment().subscribe(respon => {
    // this.listPayment = respon[2].data;
  });
  }

  // dataShipping() {
  //   this.addressService.getShipping().subscribe(respon => {
  //     this.listShip = respon;
  //   });
  // }

  formAdd() {
      this.formAddCrtl = this.fb.group({
        simpan_sebagai: new FormControl(null, Validators.required),
        penerima: new FormControl(null, Validators.required),
        hp: new FormControl(null, Validators.required),
        kodepos: new FormControl(null, [Validators.required, Validators.minLength(5)]
        ),
        province: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        district: new FormControl(null, Validators.required),
        villageId: new FormControl(null,
            Validators.required,
        ),
        alamat: new FormControl(null, Validators.required),
    });
  }

  isFieldValid(field: string) {
    return !this.formAddCrtl.get(field).valid && this.formAddCrtl.get(field).touched;
  }

  onSent() {

    if (this.formAddCrtl.valid) {
      const data = new AddShippingRequest();
      data.address = this.formAddCrtl.value.alamat;
      data.addressName = this.formAddCrtl.value.simpan_sebagai;
      data.isDefault = false;
      data.name = this.formAddCrtl.value.penerima;
      data.phone = this.formAddCrtl.value.hp;
      data.postal = this.formAddCrtl.value.kodepos;
      data.villageId = this.formAddCrtl.value.villageId;

      this.addressService.addShipping(data).subscribe(respon => {
        if (respon.status === 1) {
          this.showDialogPilihAlamat = false;
          this.getCartCheckout();
        }
      });
    } else {
      this.validateAllFormFields(this.formAddCrtl);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
  }

  onChanges() {
    this.formAddCrtl.get('province').valueChanges.subscribe(val => {
        this.getCity(val);
    });
    this.formAddCrtl.get('city').valueChanges.subscribe(val => {
        this.getDistrict(val);
    });

    this.formAddCrtl.get('district').valueChanges.subscribe(val => {
        this.getVillage(val);
    });

    this.formAddCrtl.get('villageId').valueChanges.subscribe(val => {
      const postalCode = this.villages.find(x => x.villageId === val).postal;
      this.formAddCrtl.patchValue(
        {
          kodepos: postalCode,
        });
    });
  }

  getProvince() {
    this.storeService.getProvince('209').subscribe(data => {
        this.provinces = data;
    });
  }

  getCity(id) {
      this.storeService.getCity(id).subscribe(data => {
          this.cities = data;
      });
  }
  getDistrict(id) {
      this.storeService.getDistrict(id).subscribe(data => {
          this.districts = data;
      });
  }

  getVillage(id) {
      this.storeService.getVillage(id).subscribe(data => {
          this.villages = data;
          const model = this.formAddCrtl.value;
          const a = this.formAddCrtl.value.villageId = id.district;
      });
  }

  note() {
    this.isNote = true;
  }

  cancelNote() {
    this.isNote = false;
  }

  addressChange(itemCartIds, originId, weight, destinations, index) {
    // console.log('addressChange--event: ', event);
    const val = this.shippingAddresses[index];
    if (val === 'tambah') {
      this.showDialogPilihAlamat = !this.showDialogPilihAlamat;
    } else {
      this.shippingAddressDatas[index] = destinations.find(x => x.shippingAddressId === +val);
      const queryParam = {
        itemCartIds: itemCartIds,
        originId: originId,
        destinationId: this.shippingAddressDatas[index].destinationId,
        weight: weight
      };
      this.getShippingRates(queryParam, index, (rates) => {
        const isShipFound = rates.some(x => x.courierCode + '~' + x.courierService === this.shippingRates[index]);
        if (isShipFound) {
          this.updateShipping(itemCartIds, index);
        } else {
          this.shippingRates[index] = '';
          this.updateShipping(itemCartIds, index);
        }
      });
    }
  }

  shippingChange(itemCartIds, index) {
    this.updateShipping(itemCartIds, index);
  }

  updateShipping(itemCartIds, index) {
    const data: UpdateShippingReq = new UpdateShippingReq();
    // console.log('this.shippingRates[index]: ', this.shippingRates[index]);
    data.courierCode = this.shippingRates[index].split('~')[0];
    data.courierService = this.shippingRates[index].split('~')[1];
    data.itemCartIds = itemCartIds;
    data.shippingAddressId = this.shippingAddressDatas[index].shippingAddressId;
    this.shoppingCartService.updateShipping(data).subscribe(response => {
      if (response.status === 1) {
        this.getCartCheckout();
        this.dataShipping();
      }
    });
  }

  getShippingRates(queryParam, index, callbackSc) {
    this.loadingRates[index] = true;
    this.shoppingCartService.getShippingRates(queryParam).subscribe(response => {
      this.rates[index] = response;
      // console.log('this.rates: ', this.rates);
      return callbackSc(response);
    });
  }

  dataShipping() {
    this.checkoutService.getShippingAddress().subscribe(response => {
      // console.log('response: ', response);
      this.checkoutShippingAddress = response;
      if (this.checkoutShippingAddress.length !== 0) {
        this.selectedShippingAddress = this.checkoutShippingAddress[0];
        // console.log('this.selectedShippingAddress: ', this.selectedShippingAddress);
      }
    });
  }

  tabShipping(shippingAddress) {
    this.selectedShippingAddress = shippingAddress;
  }

  deleteCart(id, prodId, quantity) {
    swal({
      title: 'belisada.co.id',
      text: 'Apakah anda ingin menghapus item ini?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.shoppingCartService.deleteCart(id).subscribe(response => {
          if (response.status === 1) {
            swal(
              'Success!',
              'Item berhasil di hapus.',
              'success'
            );
            this.shoppingCartService.addItem(prodId, -quantity);
            this.getCartCheckout();
          } else {
            swal(
              'Error!',
              response.message,
              'error'
            );
          }
        });
      }
    });
  }

  changeNote(itemCartIds, event: string) {

    const data = {
      itemCartIds: itemCartIds,
      note: event,
    };

    setTimeout(() => {
      this.shoppingCartService.updateNote(data).subscribe(response => {
        if (response.status === 1) {
          // this.shoppingCartService.updateQuantity(cartItem.productId, -1);
          // this.getCartCheckout();
        }
      });
    },
    5000);
  }

  decreaseQty(cartItem) {
    if (cartItem.quantity > 1) {
      const data = {
        itemCartId: cartItem.itemCartId,
        note: '',
        quantity: --cartItem.quantity
      };
      this.shoppingCartService.updateCart(data).subscribe(response => {
        if (response.status === 1) {
          this.shoppingCartService.updateQuantity(cartItem.productId, -1);
          this.getCartCheckout();
        }
      });
    }
  }

  increaseQty(cartItem) {
    const data = {
      itemCartId: cartItem.itemCartId,
      note: '',
      quantity: ++cartItem.quantity
    };
    this.shoppingCartService.updateCart(data).subscribe(response => {
      if (response.status === 1) {
        this.shoppingCartService.updateQuantity(cartItem.productId, +1);
        this.getCartCheckout();
      }
    });
  }

  phoneCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  showPilihAlamat() {
    this.showDialog = false;
    this.showDialogPilihAlamat = true;
  }

  updateInsurance(itemCartIds, isInsurance) {
    const updateAsuransiReq: UpdateAsuransiReq = new UpdateAsuransiReq();
    updateAsuransiReq.itemCartIds = itemCartIds;
    updateAsuransiReq.useAsuransi = isInsurance;
    this.checkoutService.updateAsuransi(updateAsuransiReq).subscribe(response => {
      console.log('response: ', response);
      this.getCartCheckout();
    });
  }

  cTransfer(item, i, statusPay) {
    console.log('sssss');
    this.isTransferBank = false;

    const dataItem = item;
    dataItem.forEach((data, n) => {
      this.isTransfer[n] = false;
    });

    this.listPaymentChild = item.find(x => x.paymentMethodCode === 'BT').data;

    if (statusPay === 'PI') {
      this.isTransfer[i] = false;
      swal(
        'Alert!',
        'Maaf metode pembayaran ini belum tersedia',
        'error'
      );
    } else {
      this.isTransfer[i] = true;
    }

    if (statusPay === 'KK') {
      this.isBtnCart = true;
    } else {
      this.isBtnCart = false;
    }

    if (statusPay === 'BT') {
      this.isBtnTransfer = true;
      this.isTransferBank = true;
    } else {
      this.isTransferBank = false;
      this.isBtnTransfer = false;
    }
  }

  doCheckout() {
    let checkoutCartIds: number[] = [];
    this.checkoutTrx.cart.forEach((item, i) => {
      if (this.checkShop[i]) {
        checkoutCartIds = checkoutCartIds.concat(
          item.itemCartIds
        );
      }
    });

    const vTransfer = 'BT';
    const vCart = 'KK';
    this.PMCode = null;
    if (this.isTransferBank === true) {
      this.PMCode = vTransfer;
    }

    if (this.isBtnCart === true) {
      this.PMCode = vCart;
    }

    if (this.PMCode === '') {
        swal('belisada.co.id', 'Anda belum memilih metode pembayaran1', 'warning');
        return;
    } else if (this.channelId === 0 && this.isTransferBank === true || this.channelId === undefined && this.isTransferBank === true) {
      swal('belisada.co.id', 'Anda belum memilih metode pembayaran', 'warning');
        return;
    } else if (checkoutCartIds.length) {

      const data: CheckoutReq = new CheckoutReq();
      data.itemCartIds = checkoutCartIds;
      data.paymentMethodCode = this.PMCode;
      data.channelId = this.channelId;
      if (this.isAny0Qty) {
        swal('belisada.co.id', 'Produk yang anda beli tidak tersedia', 'warning');
        return;
      }

      this.checkoutService.doCheckout(data).subscribe(response => {
        if (response.status === 1) {
          this.shoppingCartService.empty();
          if (this.PMCode === vTransfer) {
            this.router.navigate(['/transaction/terimakasih/' + response.data.paymentNumber]);
          } else if (this.PMCode === vCart) {
            let sign = '';
            // MerchantKey
            sign = sign.concat(environment.ipay88.MerchantKey);
            // MerchantCode
            sign = sign.concat(environment.ipay88.MerchantCode);
            // RefNo
            sign = sign.concat(response.data.paymentNumber);
            // Amount
            sign = sign.concat(this.checkoutTrx.grandTotal.toString());
            sign = sign.concat('00');
            // Currency
            sign = sign.concat(environment.ipay88.Currency);

            console.log('Berhasil', sign);
            const signature = iPay88Signature(sign);
            console.log('signature', signature);

            this._userService.getProfile().subscribe(respon => {
              this.userName = respon.name;
              this.userEmail = respon.email;
              this.userContact = respon.phone;

              this.ipay88Req.MerchantCode = environment.ipay88.MerchantCode;
              this.ipay88Req.PaymentId = '1';
              this.ipay88Req.RefNo = response.data.paymentNumber;
              this.ipay88Req.Amount = +(this.checkoutTrx.grandTotal + '00');
              this.ipay88Req.Currency = environment.ipay88.Currency;
              this.ipay88Req.ProdDesc = 'Pembelian produk';
              this.ipay88Req.UserName = this.userName;
              this.ipay88Req.UserEmail = this.userEmail;
              this.ipay88Req.UserContact = this.userContact;
              this.ipay88Req.Remark = '';
              this.ipay88Req.Lang = 'UTF-8';
              this.ipay88Req.signature = signature;
              this.ipay88Req.ResponseURL = 'https://kadal.belisada.id/payment/response';
              this.ipay88Req.BackendURL = 'https://api0.belisada.id/payment/response';

              // this.createForm.patchValue(
              //   {
              //     RefNo: response.data.paymentNumber,
              //     Amount: this.checkoutTrx.grandTotal,
              //     Currency: environment.ipay88.Currency,
              //     ProdDesc: 'Pembelian produk',
              //     UserName: this.userName,
              //     UserEmail: this.userEmail,
              //     UserContact: this.userContact,
              //     Remark: '',
              //     Lang: '',
              //     BackendURL: 'https://api0.belisada.id/payment/response',
              //     ResponseURL: environment.domain + '/transaction/terimakasih/' + response.data.paymentNumber,
              //     signature: signature
              //   });

              console.log('submit', this.createForm.value);

              setTimeout(() => {
                this.f.nativeElement.submit();
              }, 500);
            });

          }

        } else {
          swal('belisada.co.id', response.message, 'error');
        }
      });

    } else {
      swal('belisada.co.id', 'Item yang dipesan belum dipilih', 'warning');
        return;
    }
  }


}
