import { ProductDetail } from './../../model/product-detail';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AbstractRestService } from '../abstract.rest.service';

@Injectable()
export class ProductDetailService extends AbstractRestService<ProductDetail> {
  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/product/wishlist');
  }
  getProductDetail(productId: number): Observable<ProductDetail> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/detail/' + productId)
        .map(response => response as ProductDetail);
  }

  getStore(name: string): Observable<any> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/offerlisting?name=' + name)
    .map(response => response as any);
  }
  wishListCreate(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.post(this.configuration.serverWithAccUrl + '/product/wishlist/create', { headers })
        .map(resp => resp as ProductDetail);
  }
}
