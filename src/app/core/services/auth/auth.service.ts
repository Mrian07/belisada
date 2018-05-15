import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  token: any;

  checkToken() {
    if (localStorage.getItem('isRemember') === 'true') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = sessionStorage.getItem('token');
    }

    const objToken = {
      token : this.token
    };
    return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
      .pipe(
        map(resp => resp as Token)
      );
  }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini mengambil token yang tersimpan pada local storage.
  */
  getToken() {
    if (localStorage.getItem('isRemember') === 'true') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = sessionStorage.getItem('token');
    }
    if (this.token) {
      return this.token;
    }
  }
}
