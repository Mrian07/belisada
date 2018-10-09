import { CreateDiscus } from './../../models/product/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '@belisada/core/config';
import { AddProductRequest, AddProductResponse, ProductDetail, Filter,
  FilterOffers, Isi } from '@belisada/core/models/product/product.model';
import { ProductDetailSimple, ProductSimple } from '@belisada/core/models/product/product-detail-simple';
import { ProductReviewResponse } from '@belisada/core/models/product/product-review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  get(id): Observable<ProductSimple> {
    const queryParams = {
      productId: id
    };
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    params.set('productId', id);
    return this.http.get(this.configuration.apiURL + '/product/detail', {params: params})
      .pipe(
        map(response => response as ProductSimple)
      );
  }

  addProduct(data: AddProductRequest): Observable<AddProductResponse> {
    return this.http.post(this.configuration.apiURL + '/seller/product/create', data)
      .pipe(
        map(response => response as AddProductResponse)
      );
  }
  getDiscus(id: Object): Observable<Isi> {
    return this.http.get(this.configuration.apiURL + '/productfeedback/discus/all/' + id)
    .pipe(
      map(response => response as Isi)
    );
  }

  getMap(queryParams) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });

    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?',   {params: params});
  }

  detailProduct(id: Object): Observable<ProductDetail> {
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/' + id)
      .pipe(
        map(response => response as ProductDetail)
      );
  }

  getOffers(queryParams): Observable<Filter> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    // params.set('productId', id);
    return this.http.get(this.configuration.apiUrlMongo + '/search/offers', {params: params})
      .pipe(
        map(response => response as Filter)
      );
  }

  createDiscus(data) {
    return this.http.post(this.configuration.apiURL + '/productfeedback/discus/create-buyer', data);
  }


  getFilterOffers(queryParams): Observable<FilterOffers[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    // params.set('productId', id);
    return this.http.get(this.configuration.apiUrlMongo + '/search/filterOffers', {params: params})
      .pipe(
        map(response => response as FilterOffers[])
      );
  }

  getReview(id, queryParams) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/productfeedback/review/all/' + id, {params: params})
      .pipe(
        map(response => response as ProductReviewResponse)
      );
  }

}
