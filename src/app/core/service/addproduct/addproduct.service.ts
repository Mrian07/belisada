import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import { Product, SellerProduct } from '../../model/product';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { MyStore } from '../../model/store';
import { Rekening } from '../../model/rekening';

@Injectable()
export class AddproductService {

  constructor(private http: HttpClient, private configuration: Configuration) { }
  AddProduct(productData: object): Observable<Product> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', user.token);
    return this.http.post(this.configuration.serverWithAccUrl + '/seller/product/submission/create',  productData , { headers })
        .map(response => response as Product);
  }

  GetSellerProduct(id: number): Observable<SellerProduct[]> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', user.token);
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/product/submission/' + id, { headers } )
      .map(response => response as SellerProduct[]);
  }

  getAll(token): Observable<MyStore[]> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', user.token);
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/profile/store', {headers})
        .map(response => response as MyStore[]);
  }

  getBank(token): Observable<Rekening[]> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', user.token);
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/profile/bankaccount', {headers})
        .map(response => response as Rekening[]);
  }

  deleteBank(id, token): Observable<any> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', token);
    // return this.http.delete(`${this.actionUrl}/delete/${id}`, {headers})
    //     .map(response => response as T);
    return this.http.delete(this.configuration.serverWithAccUrl + '/seller/profile/bankaccount/delete/' + id, {headers})
        .map(response => response as any);
}
}
