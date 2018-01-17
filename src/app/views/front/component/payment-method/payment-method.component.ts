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

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  private storage: Storage;

  paymentMethodDtos: PaymentMethodDto[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private title: Title,
    private storageService: LocalStorageService,
    private paymentMethodService: PaymentMethodService,
    private freightRateService: FreightRateService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.PaymentMethods>
  ) {
    this.storage = this.storageService.get();
    this.store.dispatch(new frontActions.GetPaymentMethod());
  }

  ngOnInit() {
    this.title.setTitle('Belisada - Payment Method');

    this.subscription = this.actionsSubject
    .asObservable()
    .filter(action => action.type === frontActions.GET_PAYMENT_METHOD_SUCCESS)
    .subscribe((action: frontActions.GetPaymentMethodSuccess) => {
      this.getPaymentMethods();
    });

    this.freightRateService.getFreightRates(123).subscribe(response => {
      console.log('response: ', response);
    });
  }

  getPaymentMethods() {
    this.store.select<any>(fromProduct.getPaymentMethodState).subscribe(datas => {
      this.paymentMethodDtos = datas;
      console.log('this.paymentMethodDtos: ', this.paymentMethodDtos);
    });
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    this.router.navigateByUrl('/confirm-order');
  }

}
