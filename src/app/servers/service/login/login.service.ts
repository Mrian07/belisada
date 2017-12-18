import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { Login } from '../../model/login';
import { Http } from '@angular/http';

@Injectable()
export class LoginService extends AbstractRestService<Login> {

  constructor(http: Http, configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/account/masuk');
  }

}
