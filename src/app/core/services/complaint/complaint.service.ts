import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ListIssu , ListIssuReq, ListRes, Complaint} from '@belisada/core/models';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ComplaintService {

constructor(private configuration: Configuration, private http: HttpClient) { }

    getIssue(): Observable<ListIssu[]> {

        return this.http.get(this.configuration.apiURL + '/buyer/order/complain/issue')
        .pipe(
            map(response => response as ListIssu[])
        );
    }

    getIssueSolution(): Observable<ListIssu[]> {

        return this.http.get(this.configuration.apiURL + '/buyer/order/complain/issuesolution')
        .pipe(
            map(response => response as ListIssu[])
        );
    }

    // getComplaint(data: ListIssuReq): Observable<Complaint> {

    //     return this.http.get(this.configuration.apiURL + '/buyer/order/complain', data)
    //     .pipe(
    //         map(response => response as Complaint)
    //     );
    // }

    create(data: ListIssuReq): Observable<ListRes> {
        return this.http.post(this.configuration.apiURL + '/buyer/order/complain', data)
        .pipe(
            map(response => response as ListRes)
        );
    }

    getComplaint(queryParams): Observable<Complaint> {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
            params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.apiURL + '/buyer/order/complain', {params: params})
            .pipe(
                map(response => response as Complaint)
            );
    }
}
