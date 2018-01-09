import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { MyStore } from './../../model/store';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StoreService extends AbstractRestService<MyStore> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/profile/store');
  }

  getStatus(id: any): Observable<any> {
    return this.http.post(this.configuration.serverWithAccUrl + '/seller/profile/store/check', id)
        .map(response => response as any[]);
  }

}
