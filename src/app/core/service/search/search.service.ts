import { ProductSearchResault } from './../../model/product-search-resut';
import { Search } from './../../model/search';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PorductList } from '../../model/product-list';
import { Filter } from '../../model/filter';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  search(key: string): Observable<Search[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/search/' + key)
        .map(response => response as Search[]);
  }

  getFilter(q: string): Observable<Filter[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/filter?q=' + q)
        .map(response => response as Filter[]);
  }

  productList(queryParams): Observable<ProductSearchResault> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.serverWithAccUrl + '/product/search/', {params: params})
        .map(response => response as ProductSearchResault);
  }

  searchPopular(): Observable<Search[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/topsearch/all')
        .map(response => response as Search[]);
  }

  savePopular(data): Observable<any> {
    return this.http.post(this.configuration.serverWithAccUrl + '/topsearch/create', data)
        .map(response => response as any);
  }
}
