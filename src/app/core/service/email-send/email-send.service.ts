import { EmailSend } from './../../model/email-send';
import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailSendService {
  constructor(private http: HttpClient, private configuration: Configuration) { }

  emailAftersales(data): Observable<EmailSend> {
    return this.http.post(this.configuration.serverWithAccUrl + 'email/send/aftersales', data)
      .map(response => response as EmailSend);
  }
  emailContactUs(data): Observable<EmailSend> {
    return this.http.post(this.configuration.serverWithAccUrl + '/email/send/contactus', data)
      .map(response => response as EmailSend);
  }

}
