import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { Search } from '../../model/search';
import { Http } from '@angular/http';

@Injectable()
export class SearchService extends AbstractRestService<Search>  {

  constructor(http: Http, configuration: Configuration) {
    super(http, configuration.serverWithApiUrl + '/product/productlist/');
  }

}
