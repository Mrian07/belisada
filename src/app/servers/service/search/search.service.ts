import { Search } from './../../model/search';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }
    search(key: string): Observable<Search[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/product/productlist/' + key)
          .map(response => response as Search[]);
    }
}
