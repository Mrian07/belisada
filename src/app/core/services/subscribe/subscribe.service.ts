import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SubscribeM } from './model/subscribe-m';
import { Configuration } from '../../config/configuration';

@Injectable()
export class SubscribeService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  newsLetter(data: SubscribeM): Observable<SubscribeM> {
    return this.http.post(this.configuration.apiURL + '/subscribe/create', data)
      .map(response => response as SubscribeM);
  }
}
