import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { MyStore, OpenClose } from './../../model/store';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StoreService extends AbstractRestService<MyStore> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/profile/store');
  }

  getStatus(): Observable<any> {
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/profile/store/')
        .map(response => response as any[]);
  }

  getApproveProduct(id: number): Observable<any> {
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/product/legitimate/' + id )
        .map(response => response as any[]);
  }

  OpenClose(updateData) {
    return this.http.put(this.configuration.serverWithAccUrl + '/seller/profile/store/holiday', updateData)
      .map(resp => resp as OpenClose);
  }
}
