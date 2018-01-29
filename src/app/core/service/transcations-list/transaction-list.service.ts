import { Injectable } from '@angular/core';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrasnactionList } from '../../model/trasnaction-list';

@Injectable()
export class TransactionListService extends AbstractRestService<TrasnactionList> {

  constructor(private http: HttpClient, private configuration: Configuration) {
    super(http, configuration.serverWithAccUrl + '/buyer/transaction');
  }
}
