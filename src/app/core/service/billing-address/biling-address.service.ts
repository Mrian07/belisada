import { BillingAddress } from './../../model/billing-address';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BilingAddressService extends AbstractRestService<BillingAddress> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/buyer/address/billing');
   }
   getProfile(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/buyer/address/billing', { headers })
        .map(resp => resp as BillingAddress);
  }

}
