import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { Payment, Confirmation, GetConfirmation } from '@belisada/core/models/payment/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getPayment() {
    return this.http.get(this.configuration.apiURL + '/payment')
      .pipe(
        map(response => response as Payment[])
      );
  }

  getBankUser() {
    return this.http.get(this.configuration.apiURL + '/bank/user')
      .pipe(
        map(response => response as Payment[])
      );
  }

  confirmation(data): Observable<Confirmation> {
    return this.http.post(this.configuration.apiURL + '/buyer/order/confirmation/banktransfer', data)
      .pipe(
        map(response => response as Confirmation)
      );
  }

  getConfirmation(id) {
    return this.http.get(this.configuration.apiURL + '/buyer/order/confirmation/banktransfer?payment_number=' + id)
      .pipe(
        map(response => response as GetConfirmation)
      );
  }

  /**
   * Ipay entry to ipay88
   */
  public ipayEntry(queryParams) {
    // let params = new HttpParams();
    // Object.keys(queryParams).forEach(function(k) {
    //   params = params.append(k, queryParams[k]);
    // });


    const formData = new FormData();
    Object.keys(queryParams).forEach(function(k) {
      formData.append(k, queryParams[k]);
    });

    return this.http.post('https://sandbox.ipay88.co.id/epayment/entry.asp', formData).pipe(
      map(response => response)
    );

    // return this.http.request('POST', 'https://sandbox.ipay88.co.id/epayment/entry.asp', {responseType: 'text', params})
    //   .pipe(
    //     map(response => response)
    //   );
  }

}
