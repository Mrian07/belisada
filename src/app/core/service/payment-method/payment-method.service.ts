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

  // getFullPaymentMethod(): Observable<PaymentMethodDto[]> {
  //   const paymentMethodDtos = new Array<PaymentMethodDto>();

  //   this.getPaymentMethod().mergeMap(paymentMethods =>
  //     paymentMethods.map(paymentMethod =>
  //       this.getPaymentMethodDetail(paymentMethod.code).map(paymentMethodDetails => {
  //         const paymentMethodDto = new PaymentMethodDto();

  //         paymentMethodDto.paymentMethod = paymentMethod;
  //         paymentMethodDto.paymentMethodDetails = paymentMethodDetails;

  //         paymentMethodDtos.push(paymentMethodDto);
  //         return Observable.of(paymentMethodDtos);
  //       })
  //     )
  //   );
  // }

  getPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/payment')
        .map(response => response as PaymentMethod[]);
  }

  getPaymentMethodDetail(code): Observable<PaymentMethodDetail[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/payment/bank')
        .map(response => response as PaymentMethodDetail[]);
  }

}
