import { Alamat } from './../../model/alamat';
import { Rekening } from './../../model/rekening';
import { Search } from './../../model/search';
import { Propinsi } from './../../model/province';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { City } from '../../model/city';
import { Kelurahan } from '../../model/kelurahan';
import { Desa } from '../../model/desa';
import { Kecamatan } from '../../model/kecamatan';

@Injectable()
export class SearchService {
  public user: Object;
  token1 = this.user = JSON.parse(localStorage.user);
  token2 = this.token1.token;
  constructor(private http: HttpClient, private configuration: Configuration) {

  }
 
    search(key: string): Observable<Search[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/product/productlist/' + key)
          .map(response => response as Search[]);
    }

    searchProvince(id: string): Observable<Propinsi[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/cregion/getlistcregionbyidccountry/' + id)
          .map(response => response as Propinsi[]);
    }

    searchCity(id: string): Observable<City[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/ccity/getlistccitybyidregion/' + id)
          .map(response => response as City[]);
    }

    searchKelurahan(id: string): Observable<Kelurahan[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/cdistrict/getlistdistrictbycityid/' + id)
          .map(response => response as Kelurahan[]);
    }

    searchKecamatan(id: string): Observable<Kecamatan[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/village/getlistvillagebyiddistrict/' + id)
          .map(response => response as Kecamatan[]);
    }

    searchDesa(id: string): Observable<Desa[]> {
      return this.http.get(this.configuration.serverWithApiUrl + '/village/getlistvillagebyiddistrict/' + id)
          .map(response => response as Desa[]);
    }
    searchRek(): Observable<Rekening[]> {
      return this.http.get(this.configuration.serverWithAccUrl + '/bank')
          .map(response => response as Rekening[]);
    }
    postRek(token2: string): Observable<Rekening[]> {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('asdasdasd', 'xzc')
        .set('token', 'token2')
        console.log('test',token2);
      return this.http.post(this.configuration.serverWithAccUrl + '/seller/profile/bankaccount/create', { headers,token2 })
          .map(resp => resp as Rekening[]);
    }
}
