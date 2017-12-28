import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Store } from './../../model/store';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';

@Injectable()
export class StoreService extends AbstractRestService<Store> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/profile/store');
  }

}
