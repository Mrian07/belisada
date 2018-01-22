import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionsService {
  constructor(private configuration: Configuration, private http: HttpClient) { }

  completions(data) {
    return this.http.post(this.configuration.serverWithAccUrl + '/buyer/transaction/bank/completion', data)
    .map(resp => resp as any);
  }

}
