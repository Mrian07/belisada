import { Injectable } from '@angular/core';
import { Activation } from '../../model/activation';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivationService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  activateSeller(key: string): Observable<Activation> {
    return this.http.post(this.configuration.serverWithAccUrl + 'account/activation', key)
    .map(response => response as Activation);
  }

}
