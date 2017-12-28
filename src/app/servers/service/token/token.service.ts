import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../model/login';
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable()
export class TokenService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  checkToken() {
    const user = JSON.parse(localStorage.user);
    const token = {
      token : user.token
    } ;
    return this.http.post(this.configuration.serverWithAccUrl + '/account/checktoken', token)
    .map(resp => resp as Token);

  }
}
