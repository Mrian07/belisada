import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { CheckoutResponse } from '../../model/checkout';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  doCheckout(data): Observable<CheckoutResponse> {
    return this.http.post(this.configuration.serverWithAccUrl + '/buyer/order/checkout', data)
      .map(response => response as CheckoutResponse);
  }

}
