import { Bidang } from './../../model/bidang';
import { CategorySearch } from './../../model/category-search';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Category } from '../../model/category';
import { Category2} from '../../model/category2';
import { Brands } from '../../model/brands';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {

  constructor(private http: HttpClient, private configuration: Configuration) {}

  CategoryOne(): Observable<Category[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/category/c1/')
    .map(response => response as Category[]);
  }
  test(): Observable<Bidang[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/businesstype')
    .map(response => response as Bidang[]);
  }

  CategoryTwo(id: number): Observable<Category2[]> {
    return this.http.get(this.configuration.serverWithNetUrl + '/categorytwo/' + id)
    .map(response => response as Category2[]);
  }

  CategoryThree(id: number): Observable<Category2[]> {
    return this.http.get(this.configuration.serverWithNetUrl + '/categorythree/' + id)
    .map(response => response as Category2[]);
  }

  BrandCategory(): Observable<Brands[]> {
    return this.http.get(this.configuration.serverWithNetUrl + '/productbrand/seller')
    .map(response => response as Brands[]);
  }

}
