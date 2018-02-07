import { TrasnactionList } from './../../model/trasnaction-list';
// import { Injectable } from '@angular/core';
import { Rekening } from './../../model/rekening';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../abstract.rest.service';
@Injectable()
export class RepiewServiceService extends AbstractRestService<TrasnactionList> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/review');
   }

}
