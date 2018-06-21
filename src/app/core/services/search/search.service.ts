import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '@belisada/core/config';
import { ListSearch } from '@belisada/core/models/search/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getList(queryParams: Object): Observable<ListSearch> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiUrlMongo + '/search', {params: params})
    .pipe(
      map(response => response as ListSearch)
    );
  }

}
