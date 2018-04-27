import { Observable } from 'rxjs/Observable';
import * as storeModel from './models/store.model';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, District, Province, Village } from './models/address';


@Injectable()
export class StoreService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  // param: {name: string, address: string, description: string?, picture: string?}
  // used by create-store component
  create(data: storeModel.CreateStoreRequest) {
    return this.http.post(this.cfg.apiURL + '/store/upgrade', data).map(rsl => rsl as storeModel.CreateStoreResponse);
  }

  // param: {name: string, address: string, description: string}
  // used by create-store component
  isExist(data: storeModel.CheckStoreRequest): Observable<storeModel.CheckStoreResponse> {
    // return new Observable(obs => {
    //   setTimeout(() => {
    //     const res: CheckStoreResponse = new CheckStoreResponse();
    //     res.status = 5;
    //     res.message = 'toko sudah diambil orang';
    //     obs.next(res);
    //     obs.complete();
    //   }, 1500);
    // });
    return this.http.post(this.cfg.apiURL + '/store/check', data).map(rsl => rsl as storeModel.CheckStoreResponse);
  }

  // param: {name: string, address: string, description: string}
  // used by detail-store component
  detail(data: storeModel.DetailStoreRequest): Observable<storeModel.DetailStoreResponse> {
    return new Observable(obs => {
      const respOk: storeModel.DetailStoreResponse = new storeModel.DetailStoreResponse();
      const respEr: storeModel.DetailStoreResponse = new storeModel.DetailStoreResponse();
      setTimeout(() => {
        respOk.status = 1;
        respOk.data = {
          name: 'Toko Segala aya',
          address: 'Jalan kaki selamanya',
          description: 'Stok ga udah-udah',
          picture: ''
        };
        obs.next(respOk);
      }, 1500);
      setTimeout(() => {
        respEr.status = 0;
        respEr.message = 'Internal Error';
        obs.error(respEr);
        obs.complete();
      }, 3000);
    });
    // return this.http.post(this.cfg.apiURL + '/store/check', data).map(rsl => rsl as DetailStoreResponse);
  }
  profile() {
    return this.http.get(this.cfg.apiURL + '/store/profile').map(rsl => rsl as storeModel.ProfileStoreResponse);
  }

  // param: {status: string}
  // used by edit-store component
  updateStatus(data: storeModel.UpdateStoreRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update-status', data).map(rsl => rsl as storeModel.UpdateStoreResponse);
  }

  // param: {description: string?, storeUrl: string, imageStoreUrl: string, phone: string?}
  // used by edit-store component
  updateDesc(data: storeModel.UpdateStoreRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update/store', data).map(rsl => rsl as storeModel.UpdateStoreResponse);
  }

  // param: {addressName: string, address: string, description: string?, vilageId: string?, postal: string?}
  // used by edit-store component
  updateAddress(data: storeModel.UpdateStoreRequest) {
    return this.http.put(this.cfg.apiURL + '/store/update/store-address', data).map(rsl => rsl as storeModel.UpdateStoreResponse);
  }

  openStore(stat: boolean) {
    return new Observable(obs => {
      const rsp: storeModel.OpenStoreResponse = new storeModel.OpenStoreResponse();
      setTimeout(() => {
        rsp.status = 1;
        rsp.message = 'sukses buka/tutup toko';
        obs.next(rsp);
      }, 1500);

    });
  }

  /*
  With model Province
  used by create-store.component.ts
  */
  getProvince(id: any): Observable < Province[] > {
    return this.http.get(this.cfg.apiURL + '/location' + '/region/' + id)
    .map(response => response as Province[]);
  }

  /*
  With model City
  used by create-store.component.ts
  */

  getCity(id: any): Observable < City[] > {
    return this.http.get(this.cfg.apiURL + '/location' + '/city/' + id)
    .map(response => response as City[]);
  }

  /*
  With model District
  used by create-store.component.ts
  */
  getDistrict(id: any): Observable < District[] > {
    return this.http.get(this.cfg.apiURL + '/location' + '/district/' + id)
    .map(response => response as District[]);
  }

  /*
  With model Village
  used by create-store.component.ts
  */
  getVillage(id: any): Observable<Village[]> {
    return this.http.get(this.cfg.apiURL +  '/location' + '/village/' + id)
    .map(response => response as Village[]);
  }

}
