import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import * as Product from '../../model/product';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { MyStore } from '../../model/store';
import { Rekening } from '../../model/rekening';
import { AbstractRestService } from '../abstract.rest.service';
import { SellerProduct } from '../../model/product';

@Injectable()

export class AddproductService extends AbstractRestService<Product.Product> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/product/submission');
   }

     GetSellerProduct(id: number): Observable<SellerProduct[]> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/product/submission/' + id, { headers } )
      .map(response => response as SellerProduct[]);
  }

}

