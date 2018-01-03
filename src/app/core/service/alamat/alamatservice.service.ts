import { Configuration } from './../../config/configuration';
import { Injectable, OnInit } from '@angular/core';
import { Alamat } from '../../model/alamat';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AlamatserviceService {
  constructor(private http: HttpClient, private configuration: Configuration) {
  }
  // getAlamat(token: string): Observable<Alamat[]> {
  //   // const headers = new HttpHeaders()
  //   //   .set('Content-Type', 'application/json')
  //   //   .set('token', token);
  //   // return this.http.get(this.configuration.serverWithApiUrl + '/aduser/getaddress', { headers })
  //   //     .map(resp => resp as Alamat[]);
  //   return false;
  // }
}

