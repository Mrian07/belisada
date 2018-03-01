import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Login, LoginData } from '../../model/login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
declare const Buffer;

@Injectable()
export class LoginService {
  public user: Object;


  constructor(private http: HttpClient, private configuration: Configuration) {}


  doLogin(loginData): Observable<Login> {
    let obs = this.http.post(this.configuration.serverWithAccUrl + '/account/login', loginData);
    obs.subscribe(data => this.user = data);
    return obs.map(response => response as Login);
  }

  logout(): void {
      delete this.user;
      localStorage.removeItem('user');
  }

  whoLogin(): Object {

    function base64urlDecode(str) {
      return new Buffer(base64urlUnescape(str), 'base64').toString();
    }
    
    function base64urlUnescape(str) {
      str += new Array(5 - str.length % 4).join('=');
      return str.replace(/\-/g, '+').replace(/_/g, '/');
    }

    if (!this.user && localStorage.user) {
      const user = JSON.parse(localStorage.user);
      const segments = user.token.split('.');

      if (segments.length !== 3) {
        // console.log('token: Not enough or too many segments');
        return;
      }
      const payload = JSON.parse(base64urlDecode(segments[1]));
      if (payload.exp && Date.now() > payload.exp*1000) {
        // console.log('Token expired');
        return;
      }

      this.user = user;
    }
    return this.user;
  }
}
