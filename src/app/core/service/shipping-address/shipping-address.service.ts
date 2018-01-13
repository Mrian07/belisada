import { ShippingAddress } from './../../model/shipping-address';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ShippingAddressService extends AbstractRestService<ShippingAddress> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/buyer/address/shipping');
   }
   getSip(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/buyer/address/shipping', { headers })
        .map(resp => resp as ShippingAddress);
  }
  // deletSip(id, token: string) {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('token', token);
  //   return this.http.delete(this.configuration.serverWithAccUrl + '/buyer/address/shipping', {id})
  //       .map(resp => resp as ShippingAddress);
  // }
}
