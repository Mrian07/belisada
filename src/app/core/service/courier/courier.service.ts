import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Courier, CourierShipper } from '../../model/courier';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';

@Injectable()
export class CourierService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  public all(): Observable<Courier[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/shipper')
        .map(response => response as Courier[]);
  }

  public getByStoreId(storeId: number): Observable<CourierShipper[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/profile/shipper/' + storeId)
        .map(response => response as CourierShipper[]);
  }

  public save(data): Observable<any> {
    return this.http.post(this.configuration.serverWithAccUrl + '/seller/profile/store/shipper/create', data)
        .map(response => response as any);
  }

}
