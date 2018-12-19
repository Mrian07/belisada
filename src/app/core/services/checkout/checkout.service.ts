import { Injectable } from '@angular/core';
import {
  CheckoutReq, CheckoutRes,
  CheckoutShippingAddress, SuccessTransactionRes
} from '@belisada/core/models/checkout/checkout-transaction';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UpdateAsuransiReq } from '@belisada/core/models/checkout/checkout-cart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getShippingAddress(): Observable<CheckoutShippingAddress[]> {
    return this.http.get(this.configuration.apiURL + '/buyer/cart/shippingaddress')
      .pipe(
        map(response => response as CheckoutShippingAddress[])
      );
  }

  doCheckout(data: CheckoutReq): Observable<CheckoutRes> {

    return this.http.post(this.configuration.apiURL + '/buyer/transaction/checkout', data)
      .pipe(
        map(response => response as CheckoutRes)
      );
  }

  updateAsuransi(data: UpdateAsuransiReq) {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/asuransi', data)
      .pipe(
        map(response => response)
      );
  }

  getSuccessTransaction(paymentNumber): Observable<SuccessTransactionRes> {
    let params = new HttpParams();
    params = params.append('paymentNumber', paymentNumber);
    return this.http.get(this.configuration.apiURL + '/buyer/transaction/thankyoupage', {params: params})
      .pipe(
        map(response => response as SuccessTransactionRes)
      );
  }

}
