import { Injectable } from '@angular/core';
import { Fgtpassword } from '../../model/fgtpassword';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ForgotPasswordService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  fgtPassword(registernih): Observable<Fgtpassword> {
    return this.http.post(this.configuration.serverWithAccUrl + '/account/resetpassword', registernih)
    .map(response => response as Fgtpassword);
  }
}
