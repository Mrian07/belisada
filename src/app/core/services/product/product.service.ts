import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '@belisada/core/config';
import { AddProductRequest, AddProductResponse } from '@belisada/core/models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  addProduct(data: AddProductRequest): Observable<AddProductResponse> {
    return this.http.post(this.configuration.apiURL + '/seller/product/create', data)
      .pipe(
        map(response => response as AddProductResponse)
      );
  }

}
