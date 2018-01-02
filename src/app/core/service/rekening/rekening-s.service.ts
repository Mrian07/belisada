import { Rekening } from './../../model/rekening';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';

@Injectable()
export class RekeningSService extends AbstractRestService<Rekening> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/profile/bankaccount');
  }

}
