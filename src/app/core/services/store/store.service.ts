import { Observable } from 'rxjs/Observable';
import { CreateStoreResponse, CreateStoreRequest, CheckStoreRequest, CheckStoreResponse } from './models/store.model';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Village } from './models/vilage';
import { City, District, Province } from './models/address';


@Injectable()
export class StoreService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  // param: {name: string, address: string, description: string?, picture: string?}
  // used by create-store component
  create(data: CreateStoreRequest) {
    return this.http.post(this.cfg.apiURL + '/store/upgrade', data).map(rsl => rsl as CreateStoreResponse);
  }

  // param: {name: string, address: string, description: string}
  // used by create-store component
  isExist(data: CheckStoreRequest): Observable<CheckStoreResponse> {
    // return new Observable(obs => {
    //   setTimeout(() => {
    //     const res: CheckStoreResponse = new CheckStoreResponse();
    //     res.status = 5;
    //     res.message = 'toko sudah diambil orang';
    //     obs.next(res);
    //     obs.complete();
    //   }, 1500);
    // });
    return this.http.post(this.cfg.apiURL + '/store/check', data).map(rsl => rsl as CheckStoreResponse);
  }

  getProvince(id: any): Observable<Province[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/region/' + id)
        .map(response => response as Province[]);
  }

  getCity(id: any): Observable<City[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/city/' + id)
        .map(response => response as City[]);
  }

  getDistrict(id: any): Observable<District[]> {
    return this.http.get(this.cfg.apiURL+ '/location' + '/district/' + id)
        .map(response => response as District[]);
  }

  getVillage(id: any): Observable<Village[]> {
    return this.http.get(this.cfg.apiURL + '/location' + '/village/' + id)
        .map(response => response as Village[]);
  }

}
