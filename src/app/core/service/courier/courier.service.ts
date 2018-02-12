import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Courier } from '../../model/courier';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';

@Injectable()
export class CourierService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  public all(): Observable<Courier[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/shipper')
        .map(response => response as Courier[]);
  }

}
