import { Search } from './../../model/search';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PorductList } from '../../model/product-list';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  search(key: string): Observable<Search[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/product/search/' + key)
        .map(response => response as Search[]);
  }

  productList(queryParams): Observable<PorductList> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.serverWithAccUrl + '/product/search/', {params: params})
        .map(response => response as PorductList[]);
  }
}
