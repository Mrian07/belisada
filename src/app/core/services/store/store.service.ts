import { CreateStoreResponse, CreateStoreRequest } from './models/store.model';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  // param: {name: string, address: string, description: string}
  // used by create-store component
  create(data: CreateStoreRequest) {
    return this.http.post(this.cfg.apiURL + '/store/create', data).map(rsl => rsl as CreateStoreResponse);
  }

}
