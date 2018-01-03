import { Perusahaan } from './../../model/perusahaan';
import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class InfoPerusahaanService extends AbstractRestService<Perusahaan> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/seller/profile/legalinfo');
   }
}
