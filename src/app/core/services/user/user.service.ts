import { Configuration } from './../../config/configuration';
import { User } from './../cart/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignupResponse, SignupData, SigninRequest, SigninResponse } from './models/user';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  create1(user: User) {
    return this.http.post('/api/users', user);
  }

  // signup(data): Observable<SignupResponse> {
  //   const sss: SignupResponse = {status: 1, msg: 'Sukses membuat akun'};
  //   const err1: SignupResponse = {status: 2, msg: 'Gagal membuat akun'};
  //   const err2: SignupResponse = {status: 3, msg: 'Gagal membuat akun'};

  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(sss);
  //     }, 1000);

  //     setTimeout(() => {
  //       observer.next(err1);
  //     }, 3000);

  //     setTimeout(() => {
  //       observer.error(err2);
  //     }, 5000);

  //   });
  // }
  signup(data: SignupData): Observable<SignupResponse> {
    return this.http.post(this.config.apiURL + '/account/create', data)
      .map(response => response as SignupResponse);
  }
  signin(request: SigninRequest): Observable<SigninResponse> {
    return this.http.post(this.config.apiURL + '/account/login', request)
      .map(response => response as SigninResponse);
  }
  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id);
  }

  create(user: User) {
    return this.http.post('/api/users', user);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

}
