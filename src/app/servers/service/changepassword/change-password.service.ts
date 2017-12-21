import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../../model/changepassword';
import 'rxjs/add/operator/map';

@Injectable()
export class ChangePasswordService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  ChangePassword(data): Observable<ChangePassword> {
    return this.http.post(this.configuration.serverWithAccUrl, data)
    .map(response => response as ChangePassword);
  }

}
