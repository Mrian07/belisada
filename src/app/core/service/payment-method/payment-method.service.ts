import { PaymentMethodDto } from './../../model/paymentMethodDto';
import { switchMap } from 'rxjs/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentMethod } from '../../model/PaymentMethod';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import { PaymentMethodDetail } from '../../model/PaymentMethodDetail';

@Injectable()
export class PaymentMethodService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/payment')
        .map(response => response as PaymentMethod[]);
  }

  getPaymentMethodDetail(code): Observable<PaymentMethodDetail[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/payment/bank')
        .map(response => response as PaymentMethodDetail[]);
  }

  getUniqueCodeTransfer(paymentMethod): Observable<any> {
    return this.http.get(this.configuration.serverWithAccUrl + '/buyer/transaction/transfer/' + paymentMethod)
        .map(response => response as any);
  }

}
