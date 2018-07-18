import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { OrderStatus, UploadImgTransfer } from '@belisada/core/models/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

    getOrder(data) {
      return this.http.get(this.configuration.apiURL + '/buyer/transaction/history?transaction_status=' + data)
      .pipe(
        map(response => response as OrderStatus)
      );
    }

    uploadImgTransfer(data: UploadImgTransfer): Observable<UploadImgTransfer> {
      return this.http.put(this.configuration.apiURL + '/buyer/transaction/banktransfer/completion', data)
        .pipe(
          map(response => response as UploadImgTransfer)
        );
    }

}
