import { CategorySearch } from './../../model/category-search';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Category } from '../../model/category';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CategoryService extends AbstractRestService<Category> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithApiUrl + '/category/list/');
  }

  getCategorySearch(): Observable<CategorySearch[]> {
    return this.http.get(this.configuration.serverWithApiUrl + '/category')
        .map(response => response as CategorySearch[]);
  }
}
