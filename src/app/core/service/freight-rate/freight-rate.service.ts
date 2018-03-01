import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { FreightRate } from '../../model/FreightRate';

@Injectable()
export class FreightRateService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getFreightRates(villageId): Observable<FreightRate[]> {
    // console.log(villageId);
    return this.http.get(this.configuration.serverWithAccUrl + '/freight/rates?to=' + villageId)
        .map(response => response as FreightRate[]);
  }
}
