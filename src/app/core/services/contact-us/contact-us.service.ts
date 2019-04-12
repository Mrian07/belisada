import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ContactUsModel } from '@belisada/core/models';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private configuration: Configuration, private http: HttpClient) { }
  insert(data) {
      return this.http.post(this.configuration.apiURL + '/contactus', data)
      .pipe(
          map(response => response as ContactUsModel)
    );
  }
}

