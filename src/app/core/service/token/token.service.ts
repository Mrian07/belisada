import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../model/login';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  checkToken() {
    const user = JSON.parse(localStorage.user);
    const token = {
      token : user.token
    } ;
    return this.http.post(this.configuration.serverWithAccUrl + '/account/checktoken', token)
    .map(resp => resp as Token);
  }
  checkTokenValid() {

    const sendtoken = {
      token : this.getToken()
    } ;

    return this.http.post(this.configuration.serverWithAccUrl + '/account/checktoken', sendtoken)
    .map(resp => resp as Token);
  }

  getToken() {
    const json = localStorage.user;
    if (json) {
      const user = JSON.parse(localStorage.user);
      return user.token;
    }
  }

  getUser() {
    const json = localStorage.user;
    if (json) {
      const user = JSON.parse(localStorage.user);
      return user;
    }
  }

  redirect() {
    localStorage.removeItem('user');
    location.assign('/login');
  }




}
