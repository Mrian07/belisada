import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada/core/config';
import { map } from 'rxjs/operators';
import { ListReview , ListReviewReq, ReviewBuyer} from '@belisada/core/models/review/review.model';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {

constructor(private configuration: Configuration, private http: HttpClient) { }

    getReview(id: Object): Observable<ListReview> {

        return this.http.get(this.configuration.apiURL + '/productfeedback/review/all/' + id)
        .pipe(
            map(response => response as ListReview)
        );
    }

    createReview(data: ListReviewReq): Observable<ListReview> {
        return this.http.post(this.configuration.apiURL + '/productfeedback/review/create', data)
        .pipe(
            map(response => response as ListReview)
        );
    }

    getReviewBuyer(queryParams?): Observable<ReviewBuyer> {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
            params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.apiURL + '/productfeedback/review/buyer', {params: params})
        .pipe(
            map(response => response as ReviewBuyer)
        );
    }
}
