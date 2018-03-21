import { Configuration } from './../../config/configuration';
import { User } from './../cart/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignupResponse, SignupData, EmailChecking } from './models/user';

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
  signup(data: SignupData): Observable<SignupResponse> {
    return this.http.post(this.config.apiURL + '/account/create', data)
      .map(resp => resp as SignupResponse);
  }
  checkEmail(data: EmailChecking): Observable<EmailChecking> {
    return this.http.post(this.config.apiURL + '/account/checkemail', data)
      .map(resp => resp as EmailChecking);
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
