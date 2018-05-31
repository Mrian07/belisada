import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { Reference } from '@belisada/core/models/reference/reference.model';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getReference(queryParams): Observable<Reference[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/reference', {params: params})
      .pipe(
        map(response => response as Reference[])
      );
  }
}
