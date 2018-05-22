import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryList } from '@belisada/core/models/category/category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getListCategory(queryParams): Observable<CategoryList> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/category', {params: params})
      .pipe(
        map(response => response as CategoryList)
      );
  }
}
