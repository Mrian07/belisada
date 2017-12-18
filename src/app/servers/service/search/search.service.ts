import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Search } from '../../model/search';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http, private configuration: Configuration) {
  }
    Search(key: string) {
      return this.http.get(this.configuration.serverWithApiUrl + '/product/productlist/' + key)
          .map(resp => resp.json());
    }
}
