import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Login } from '../../model/login';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  public user: Object;

  constructor(private http: HttpClient, private configuration: Configuration) {}

  doLogin(loginData): Observable<Login> {
    return this.http.post(this.configuration.serverWithAccUrl + '/account/masuk', loginData)
        .map(response => response as Login);
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      delete this.user;
      localStorage.removeItem('user');
  }

  whoLogin(): Object {
    if(!this.user && localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
    return this.user;
  }
}
