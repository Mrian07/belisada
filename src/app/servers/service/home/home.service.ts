import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { HomeView } from '../../model/home.view';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TopProductCategory } from '../../model/top-product-category';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient, private configuration: Configuration) {  }

  getHomeThumbnail(): Observable<HomeView> {
    return this.http.get(this.configuration.serverWithApiUrl + '/home/view')
        .map(response => response as HomeView);
  }

  getTopProductCategory(): Observable<TopProductCategory> {
    return this.http.get(this.configuration.serverWithApiUrl + '/home/topproductcategory')
        .map(response => response as TopProductCategory);
  }
}
