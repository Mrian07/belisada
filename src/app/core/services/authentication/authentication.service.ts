import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Token } from './models/authentication.model';

/*
AuthenticationService.ts digunakan di app.module.ts
*/

@Injectable()
export class AuthenticationService {
    constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

    /*
    Fungsi ini untuk melakukan pengecekan token dari local storage ke backend.
    */
    checkToken() {
        const token = localStorage.getItem('token');
        const objToken = {
          token : token
        } ;

        /*
        Hasil dari token yang dicocokan dari local storage ke backend akan di maping menggunakan class Token pada authentication.model.
        */
        return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
        .map(resp => resp as Token);
    }

    /*
    Fungsi ini mengambil token yang tersimpan pada local storage.
    */
    getToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
    }
}
