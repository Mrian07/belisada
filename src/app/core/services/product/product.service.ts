import {
  ProductDetailV2, ProductDetailV2Store, ProductDetailV2Price,
  ProductDetailV2Variant, ProductDetailV2Spec, AnotherOffers, AnotherOfferDetail } from './../../models/product/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '@belisada/core/config';
import { AddProductRequest, AddProductResponse, ProductDetail, Filter,
  FilterOffers, Isi } from '@belisada/core/models/product/product.model';
import { ProductSimple } from '@belisada/core/models/product/product-detail-simple';
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

  getReview(id: Object): Observable<ProductReviewResponse[]> {
    return this.http.get(this.configuration.apiURL + '/productfeedback/review/all/' + id)
    .pipe(
        map(response => response as ProductReviewResponse[])
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

  getProductDetailV2Spec(id): Observable<ProductDetailV2Spec[]> {
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/v2/specification/' + id).pipe(
      map(response => response as ProductDetailV2Spec[])
    );
  }

  getProductDetailV2Variant(id): Observable<ProductDetailV2Variant[]> {
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/v2/variation/' + id).pipe(
      map(response => response as ProductDetailV2Variant[])
    );
  }

  getProductDetailV2Store(id, queryParams?): Observable<ProductDetailV2Store> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/v2/store/' + id, {params: params}).pipe(
      map(response => response as ProductDetailV2Store)
    );
  }

  getProductDetailV2Price(id, queryParams?): Observable<ProductDetailV2Price> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/v2/price/' + id, {params: params}).pipe(
      map(response => response as ProductDetailV2Price)
    );
  }

  getProductDetailV2(id, queryParams?): Observable<ProductDetailV2> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiUrlMongo + '/product/detail/v2/' + id, {params: params}).pipe(
      map(response => response as ProductDetailV2)
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

  // getReview(id, queryParams) {
  //   let params = new HttpParams();
  //   Object.keys(queryParams).forEach(function(k) {
  //     params = params.append(k, queryParams[k]);
  //   });
  //   return this.http.get(this.configuration.apiURL + '/productfeedback/review/all/' + id, {params: params})
  //     .pipe(
  //       map(response => response as IsiReview)
  //     );
  // }

  /*
  Prod Another
  */

// getProductAnotherV2(id): Observable<AnotherOffers> {
//   return this.http.get(this.configuration.apiUrlMongo + '/offers/detail/' + id).pipe(
//     map(response => response as AnotherOffers)
//   );
// }
getProductAnotherV2(id): Observable<AnotherOffers[]> {
  return this.http.get(this.configuration.apiUrlMongo + '/offers/detail/' + id)
    .pipe(
      map(response => response as AnotherOffers[])
    );
}
getProductAnotherVarian(id): Observable<ProductDetailV2Variant[]> {
  return this.http.get(this.configuration.apiUrlMongo + '/offers/variation/' + id)
    .pipe(
      map(response => response as ProductDetailV2Variant[])
    );
}


getProductDataDetail(id, queryParams):  Observable<AnotherOfferDetail> {
  let params = new HttpParams();
  Object.keys(queryParams).forEach(function(k) {
    params = params.append(k, queryParams[k]);
  });
  return this.http.get(this.configuration.apiUrlMongo + '/offers/' + id, {params: params})
    .pipe(
      map(response => response as AnotherOfferDetail)
    );
}

}
