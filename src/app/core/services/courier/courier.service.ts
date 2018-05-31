import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryList, CategoryAttribute } from '@belisada/core/models/category/category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Courier } from '@belisada/core/models/courier/courier.model';

@Injectable({
  providedIn: 'root',
})
export class CourierService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getCourier(): Observable<Courier[]> {

    return this.http.get(this.configuration.apiURL + '/courier')
      .pipe(
        map(response => response as Courier[])
      );
  }
}
