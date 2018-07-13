import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddShippingRequest, AddShippingResponse, GetShippingResponse } from '@belisada/core/models/address/address.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  addShipping(data: AddShippingRequest) {
    return this.http.post(this.configuration.apiURL + '/address/shipping/create', data)
      .pipe(
        map(rsl => rsl as AddShippingResponse)
      );
  }

  getShipping() {
    return this.http.get(this.configuration.apiURL + '/address/shipping')
      .pipe(
        map(rsl => rsl as GetShippingResponse[])
      );
  }
}
