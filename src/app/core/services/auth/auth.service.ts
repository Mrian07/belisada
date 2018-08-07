import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@belisada/core/models';
import { Configuration } from '@belisada/core/config';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private configuration: Configuration,
    private http: HttpClient,
    public afAuth: AngularFireAuth
  ) { }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini untuk melakukan pengecekan token dari local storage ke backend.
  */

  token: any;

  checkToken() {
    this.token = localStorage.getItem('token');

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
    this.token = localStorage.getItem('token');
    if (this.token) {
      return this.token;
    }
  }

  refreshToken(): Observable<Token> {

    return this.http.get(this.configuration.apiURL + '/account/refreshtoken')
      .pipe(
        map(response => response as Token)
      );
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }
}
