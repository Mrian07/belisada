import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { MidResponse, MidRequest } from '@belisada/core/models/midtrans/midtrans.model';

@Injectable({
  providedIn: 'root',
})
export class MidtransService {
  constructor(private configuration: Configuration, private http: HttpClient) { }

  getPay(data: MidRequest): Observable<MidResponse>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Basic U0ItTWlkLXNlcnZlci1pZ1pMT0dfNWZDS0IzV25tdmhFdHh6Rks6'
      })
    };
    return this.http.post(this.configuration.urlMidtrans + '/snap/v1/transactions', data, httpOptions)
      .pipe(
        map(response => response as MidResponse)
      );
  }

}
