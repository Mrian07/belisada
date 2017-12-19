
import { Configuration } from './../../config/configuration';
import { Http, RequestOptions, Headers, HttpModule } from '@angular/http';
import { Injectable, Component, OnInit } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Alamat } from '../../model/alamat';
import { Observable } from 'rxjs/Observable';

import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class AlamatserviceService {
  constructor(private http: Http, private configuration: Configuration) {
  }
  alat(token: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.configuration.serverWithApiUrl + '/aduser/getaddress', options)
        .map(resp => resp.json());
  }
}

