import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { Invoice, ContentOrderStatus, UploadImgTransfer } from '@belisada/core/models/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

    getOrder(data) {
      return this.http.get(this.configuration.apiURL + '/buyer/transaction/history/v2?transaction_status=' + data)
      .pipe(
        map(response => response as ContentOrderStatus)
      );
    }

    uploadImgTransfer(data: UploadImgTransfer): Observable<UploadImgTransfer> {
      return this.http.put(this.configuration.apiURL + '/buyer/transaction/banktransfer/completion', data)
        .pipe(
          map(response => response as UploadImgTransfer)
        );
    }

    getInvoice(data) {
      return this.http.get(this.configuration.apiURL + '/buyer/transaction/invoicenumber?orderNumber=' + data)
      .pipe(
        map(response => response as Invoice)
      );
    }

}
