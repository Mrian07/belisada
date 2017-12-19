import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { Login } from '../../model/login';

@Injectable()
export class LoginService extends AbstractRestService<Login> {

  constructor(http: HttpClient, configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/account/masuk');
  }

}
