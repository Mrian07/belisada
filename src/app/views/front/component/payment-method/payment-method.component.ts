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

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  paymentMethods: PaymentMethod[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private title: Title,
    private paymentMethodService: PaymentMethodService,
    private actionsSubject: ActionsSubject,
    private store: Store<fromProduct.PaymentMethods>
  ) {
    //
  }

  ngOnInit() {
    this.store.dispatch(new frontActions.GetPaymentMethod());
    this.title.setTitle('Belisada - Payment Method');

    // this.subscription = this.actionsSubject
    // .asObservable()
    // .filter(action => action.type === frontActions.GET_PAYMENT_METHOD_SUCCESS)
    // .subscribe((action: frontActions.GetPaymentMethodSuccess) => {
    //   this.getPaymentMethods();
    // });
  }

  getPaymentMethods() {
    this.store.select<any>(fromProduct.getPaymentMethodState).subscribe(data => {
      console.log('data: ', data);
    });
  }

  prev() {
    this.router.navigateByUrl('/shipping');
  }

  next() {
    this.router.navigateByUrl('/confirm-order');
  }

}
