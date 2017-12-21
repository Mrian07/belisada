import { Register } from './../../model/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private configuration: Configuration, private httpClient: HttpClient) { }

    register(register) {
      return this.httpClient.post(this.configuration.serverWithacc1, register)
      .map(response => response as Register);
    }

}
