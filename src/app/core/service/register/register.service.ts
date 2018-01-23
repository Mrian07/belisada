import { Register } from './../../model/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private configuration: Configuration, private httpClient: HttpClient) { }

    register(register) {
      return this.httpClient.post(this.configuration.serverWithAccUrl + '/account/create', register)
      .map(response => response as Register);
    }

    activate(key) {
      return this.httpClient.post(this.configuration.serverWithAccUrl + '/account/activation', {key: key})
      .map(response => response as Register);
    }

    check(key) {
      return this.httpClient.post(this.configuration.serverWithAccUrl + '/seller/profile/store/check', {name: key})
      .map(response => response as Register);
    }

}
