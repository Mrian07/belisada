import swal from 'sweetalert2';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingAddressService } from '../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from '../../../../core/model/shipping-address';
import { BilingAddressService } from '../../../../core/service/billing-address/biling-address.service';
import { BillingAddress } from '../../../../core/model/billing-address';
import { ShareService } from '../../../../core/service/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  shippingAddress: ShippingAddress;
  shippingAddressList: ShippingAddress[];

  billingAddress: BillingAddress;
  billingAddressList: BillingAddress[];

  selShippingAddress: any = '';
  selBillingAddress: any = '';

  isTriggered: Boolean = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private title: Title,
    private shareService: ShareService,
    private shippingAddressService: ShippingAddressService,
    private bilingAddressService: BilingAddressService
  ) { }

  ngOnInit() {
    this.title.setTitle('Belisada - Shipping & Billing Address');

    this.getAllShippingAddress();

    this.bilingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.billingAddressList = this.shareService.shareData;
        console.log('this.billingAddressList: ', this.billingAddressList);
      });
    });
  }

  receiveTrigger($event) {
    console.log('receiveTrigger($event): ', $event);
    this.getAllShippingAddress();
  }

  getAllShippingAddress() {
    this.shippingAddressService.getAll().subscribe(datas => {
      this.ngZone.run(() => {
        this.shareService.shareData = datas;
        this.shippingAddressList = this.shareService.shareData;
        console.log('this.shippingAddressList: ', this.shippingAddressList);
      });
    });
  }

  getShippingAddress(selShippingAddress) {
    console.log(selShippingAddress);
    this.shippingAddress = this.shippingAddressList.find(x => x.addressId === +selShippingAddress);
    console.log('this.shippingAddress: ', this.shippingAddress);
  }

  getBillingAddress(selBillingAddress) {
    console.log(selBillingAddress);
    this.billingAddress = this.billingAddressList.find(x => x.addressId === +selBillingAddress);
    console.log('this.shippingAddress: ', this.billingAddress);
  }

  next() {
    if (this.shippingAddress && this.billingAddress) {
      this.router.navigateByUrl('/payment-method');
    } else {
      swal('Pastikan anda memilih alamat pengiriman dan alamat penagihan');
    }
  }

  prev() {
    this.router.navigateByUrl('/cart');
  }

}
