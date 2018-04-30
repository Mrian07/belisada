import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Token } from '@belisada/core/models';
import { Configuration } from '@belisada/core/config';

@Injectable()
export class AuthService {
  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini untuk melakukan pengecekan token dari local storage ke backend.
  */
  checkToken() {
    const token = localStorage.getItem('token');
    const objToken = {
      token : token
    };
    return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
        .map(resp => resp as Token);
  }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini mengambil token yang tersimpan pada local storage.
  */
  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
  }
}
