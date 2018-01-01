import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../../model/changepassword';
import 'rxjs/add/operator/map';

@Injectable()
export class ChangePasswordService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  ChangePassword(data): Observable<ChangePassword> {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', user.token);
    return this.http.put(this.configuration.serverWithAccUrl + '/account/changepassword', data, {headers})
    .map(response => response as ChangePassword);
  }

}
