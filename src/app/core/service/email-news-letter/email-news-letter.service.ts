import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { EmailNewsLetter } from '../../model/email-news-letter';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailNewsLetterService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  newsLetterSubscription(data): Observable<EmailNewsLetter> {
    return this.http.post(this.configuration.serverWithAccUrl + '/newsletter/contactus', data)
      .map(response => response as EmailNewsLetter);
  }

}
