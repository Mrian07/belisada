import { Country } from './../../model/country';
import { Bank } from './../../model/bank';
import { Village } from './../../model/village';
import { District } from './../../model/district';
import { City } from './../../model/city';
import { Configuration } from './../../config/configuration';
import { Province } from './../../model/province';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MasterService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getCountry(): Observable<Country[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/country')
        .map(response => response as Country[]);
  }

  getProvince(id: any): Observable<Province[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/region/' + id)
        .map(response => response as Province[]);
  }

  getCity(id: any): Observable<City[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/city/' + id)
        .map(response => response as City[]);
  }

  getDistrict(id: any): Observable<District[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/district/' + id)
        .map(response => response as District[]);
  }

  getVillage(id: any): Observable<Village[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/village/' + id)
        .map(response => response as Village[]);
  }

  getBankList(): Observable<Bank[]> {
    return this.http.get(this.configuration.serverWithAccUrl + '/bank')
        .map(response => response as Bank[]);
  }
}
