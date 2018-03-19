import { User } from './../cart/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignupResponse } from './models/user';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  create1(user: User) {
    return this.http.post('/api/users', user);
}
  signup(data): Observable<SignupResponse> {
    const sss: SignupResponse = {status: 1, msg: 'Sukses membuat akun'};
    const err1: SignupResponse = {status: 2, msg: 'Gagal membuat akun'};
    const err2: SignupResponse = {status: 3, msg: 'Gagal membuat akun'};

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(sss);
      }, 1000);

      setTimeout(() => {
        observer.next(err1);
      }, 3000);

      setTimeout(() => {
        observer.error(err2);
      }, 5000);

    })
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
