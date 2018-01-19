import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductDetail } from './../../model/product-detail';
@Injectable()
export class WishlistBuyerService extends AbstractRestService<ProductDetail> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/product/wishlist');
  }

  // getWishlist(token: string) {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('token', token);
  //   return this.http.get(this.configuration.serverWithAccUrl + '/product/wishlist', { headers })
  //       .map(resp => resp as ProductDetail);
  // }
}
