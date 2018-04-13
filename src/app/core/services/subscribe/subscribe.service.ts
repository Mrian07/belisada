import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SubscribeRequest, SubscribeResponse } from './model/subscribe-m';
import { Configuration } from '../../config/configuration';

@Injectable()
export class SubscribeService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  // param: {email: string}
  // used by layout/footer component
  newsLetter(data: SubscribeRequest): Observable<SubscribeResponse> {
    return this.http.post(this.configuration.apiURL + '/subscribe/create', data)
      .map(response => response as SubscribeResponse);
  }
}
