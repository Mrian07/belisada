import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home, FlashSaleResponse, FlashSaleExpiredResponse } from '@belisada/core/models';

@Injectable({
  providedIn: 'root'
})
export class HomeSService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  getHomePopular(): Observable<Home> {
    return this.http.get(this.cfg.apiUrlMongo + '/home/popular/')
      .pipe(
        map(response => response as Home)
      );
  }

  getFlashSale(queryParams): Observable<FlashSaleResponse> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.cfg.apiUrlMongo + '/home/flash-sale', {params: params})
      .pipe(
        map(response => response as FlashSaleResponse)
      );
  }

  getFlashSaleExpired(): Observable<FlashSaleExpiredResponse> {
    return this.http.get(this.cfg.apiUrlMongo + '/home/flash-sale/expired')
      .pipe(
        map(response => response as FlashSaleExpiredResponse)
      );
  }
}
