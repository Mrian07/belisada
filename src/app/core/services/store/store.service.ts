import { Observable } from 'rxjs/Observable';
import { CreateStoreResponse, CreateStoreRequest, CheckStoreRequest, CheckStoreResponse } from './models/store.model';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  // param: {name: string, address: string, description: string?, picture: string?}
  // used by create-store component
  create(data: CreateStoreRequest) {
    return this.http.post(this.cfg.apiURL + '/store/create', data).map(rsl => rsl as CreateStoreResponse);
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

}
