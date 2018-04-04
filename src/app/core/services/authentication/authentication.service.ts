import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Token } from './models/authentication.model';

@Injectable()
export class AuthenticationService {
    constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

    checkToken() {
        const token = localStorage.getItem('token');
        const objToken = {
          token : token
        } ;
        return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
        .map(resp => resp as Token);
    }

    getToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
    }
}
