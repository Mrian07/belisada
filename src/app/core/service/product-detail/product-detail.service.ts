import { ProductDetail } from './../../model/product-detail';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AbstractRestService } from '../abstract.rest.service';

@Injectable()
export class ProductDetailService {
  constructor(private http: HttpClient, private configuration: Configuration) {}
  getProductDetail(productId: number): Observable<ProductDetail> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/detail/' + productId)
        .map(response => response as ProductDetail);
  }

  getStore(name: string): Observable<any> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/offerlisting?name=' + name)
    .map(response => response as any);
  }
}
