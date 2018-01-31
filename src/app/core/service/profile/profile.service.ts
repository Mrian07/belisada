import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Profile } from '../../model/profile';
import 'rxjs/add/operator/map';
import { Bank } from '../../model/bank';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getProfile(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/seller/profile/personaldata/', { headers })
        .map(resp => resp as Profile);
  }

  getBank(token: string): Observable<Bank[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/bank/', { headers })
        .map(resp => resp as Bank[]);
  }

  updateProfile(updateData) {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', user.token);
    return this.http.put(this.configuration.serverWithAccUrl + '/seller/profile/personaldata/update/', updateData, { headers })
      .map(resp => resp as Profile);
  }
  updatebuyerProfile(updateData) {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', user.token);
    return this.http.put(this.configuration.serverWithAccUrl + '/buyer/profile/personaldata/update/', updateData, { headers })
      .map(resp => resp as Profile);
  }

  getProfileBuyer(token: string) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', token);
    return this.http.get(this.configuration.serverWithAccUrl + '/buyer/profile/personaldata/', { headers })
        .map(resp => resp as Profile);
  }

  updateProfileBuyer(updateData) {
    const user = JSON.parse(localStorage.user);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', user.token);
    return this.http.put(this.configuration.serverWithAccUrl + '/buyer/profile/personaldata/update/', updateData, { headers })
      .map(resp => resp as Profile);
  }

}
