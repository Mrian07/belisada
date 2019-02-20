import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { MidtransRequest, MidtransResponse } from '@belisada/core/models/midtrans/midtrans.model';

@Injectable({
  providedIn: 'root',
})
export class MidtransService {
  constructor(private configuration: Configuration, private http: HttpClient) { }

  getPay(data: MidtransRequest): Observable<MidtransResponse>  {
    return this.http.post(this.configuration.apiURL + '/snap/v1/transactions', data)
      .pipe(
        map(response => response as MidtransResponse)
      );
  }

}
