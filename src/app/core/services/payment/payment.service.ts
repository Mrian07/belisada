import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { Payment } from '@belisada/core/models/payment/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getPayment() {
    return this.http.get(this.configuration.apiURL + '/payment')
      .pipe(
        map(response => response as Payment)
      );
  }
}
