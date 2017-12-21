import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SendEmail } from '../../model/sendemail';
import 'rxjs/add/operator/map';

@Injectable()
export class SendEmailService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  SendEmail(data): Observable<SendEmail> {
    return this.http.post(this.configuration.serverWithAccUrl + 'account/sendemail', data)
    .map(response => response as SendEmail);
  }

}
