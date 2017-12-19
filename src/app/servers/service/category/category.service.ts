import { HttpClient } from '@angular/common/http';
import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Category } from '../../model/category';


@Injectable()
export class CategoryService extends AbstractRestService<Category> {

  constructor(http: HttpClient, configuration: Configuration) {
    super(http, configuration.serverWithApiUrl + '/category/list/');
  }
}
