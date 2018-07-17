import { Injectable } from '@angular/core';
import { CheckoutReq, CheckoutRes } from '@belisada/core/models/checkout/checkout-transaction';
import { Configuration } from '@belisada/core/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  doCheckout(data: CheckoutReq): Observable<CheckoutRes> {

    return this.http.post(this.configuration.apiURL + '/buyer/transaction/checkout', data)
      .pipe(
        map(response => response as CheckoutRes)
      );
  }
}
