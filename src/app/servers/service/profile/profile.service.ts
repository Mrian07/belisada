import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../../model/profile';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getProfile(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/account/profile/, { headers }')
        .map(resp => resp as Profile[]);
  }
}
