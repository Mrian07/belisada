import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { Configuration } from '../../config/configuration';
import { Product } from '../../model/product';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable()
export class AddproductService {

  constructor(private http: HttpClient, private configuration: Configuration) { }
  AddProduct(productData): Observable<Product> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', user.token);
    return this.http.post(this.configuration.serverWithAccUrl + '/seller/product/submission/create', { productData }, { headers })
        .map(response => response as Product);
  }
}
