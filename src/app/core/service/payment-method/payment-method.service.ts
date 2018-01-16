import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentMethod } from '../../model/PaymentMethod';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';

@Injectable()
export class PaymentMethodService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get(this.configuration.serverWithAccUrl + 'payment')
        .map(response => response as PaymentMethod[]);
  }

}
