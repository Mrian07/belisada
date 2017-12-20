import { SalesStatus } from './../../model/sales-status';
import { Configuration } from './../../config/configuration';
import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class SalesStatusService {

  constructor(private http: HttpClient, private configuration: Configuration) {

  }
  getstatus(token: string): Observable<SalesStatus[]> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', token);
  return this.http.get(this.configuration.serverWithApiUrl + '/aduser/getaddress', { headers })
      .map(resp => resp as SalesStatus[]);

  }
}
