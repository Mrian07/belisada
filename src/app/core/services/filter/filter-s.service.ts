import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { FilterM } from '@belisada/core/models/filter/filter-m';

@Injectable({
  providedIn: 'root'
})
export class FilterSService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  getFilter(queryParams): Observable<FilterM>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.cfg.apiURL2 + '/search/filter', {params: params} )
    .pipe(
      map(response => response as FilterM)
    );
  }
}
