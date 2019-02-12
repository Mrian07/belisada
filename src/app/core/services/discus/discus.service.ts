import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { BuyerDiscus, CreateBuyerDiscusRequest, CreateBuyerDiscusResponse} from '@belisada/core/models/discus/discus.model';

@Injectable({
    providedIn: 'root',
})
export class DiscusService {

constructor(private configuration: Configuration, private http: HttpClient) { }

    getListBuyerDiscus(queryParams?): Observable<BuyerDiscus> {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
            params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.apiURL + '/productfeedback/discus/buyer', {params: params})
        .pipe(
            map(response => response as BuyerDiscus)
        );
    }


    addBuyerDiscus(data: CreateBuyerDiscusRequest): Observable<CreateBuyerDiscusResponse> {
      return this.http.post(this.configuration.apiURL + '/productfeedback/discus/create-buyer', data)
      .pipe(
        map(response => response as CreateBuyerDiscusResponse)
      );
    }
}
