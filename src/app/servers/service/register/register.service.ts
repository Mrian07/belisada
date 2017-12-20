import { Register } from './../../model/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';

@Injectable()
export class RegisterService {

  constructor(private configuration: Configuration, private httpClient: HttpClient) { }

    register(registerData) {
      return this.httpClient.post(this.configuration.serverWithAccUrl, registerData)
      .map(response => response as Register);
    }
}
