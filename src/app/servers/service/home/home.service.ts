import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { HomeView } from '../../model/home.view';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService extends AbstractRestService<HomeView> {

  constructor(http: HttpClient, configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/home/view');
  }
}
