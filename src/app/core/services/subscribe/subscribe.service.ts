import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Configuration } from '@belisada/core/config';
import { SubscribeResponse, SubscribeRequest } from '@belisada/core/models';

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
