import { Configuration } from './../../config/configuration';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Category } from '../../model/category';


@Injectable()
export class CategoryService extends AbstractRestService<Category> {

  constructor(http: Http, configuration: Configuration) {
    super(http, configuration.serverWithApiUrl + '/category/list');
  }

}
