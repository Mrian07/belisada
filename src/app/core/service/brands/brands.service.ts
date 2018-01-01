import { Injectable } from '@angular/core';
import { Brands } from '../../model/brands';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandsService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  BrandCategory(): Observable<Brands[]> {
    return this.http.get(this.configuration.serverWithNetUrl + '/productbrand')
    .map(response => response as Brands[]);
  }
}
