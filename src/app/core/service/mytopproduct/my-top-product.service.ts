import { MyTopProduct } from './../../model/my-top-product';
import { Configuration } from './../../config/configuration';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MyTopProductService {

  constructor(private http: HttpClient, private configuration: Configuration) {

   }
   getWishlist(token: string): Observable<MyTopProduct[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithApiUrl + '/product/getwishlist', { headers })
        .map(resp => resp as MyTopProduct[]);
        // api ini dari wishlist
  }

}
