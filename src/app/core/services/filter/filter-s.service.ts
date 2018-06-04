import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { FilterM } from '@belisada/core/models/filter/filter-m';

@Injectable({
  providedIn: 'root'
})
export class FilterSService {

  constructor(private cfg: Configuration, private http: HttpClient) { }

  getFilter(): Observable<FilterM>  {
    return this.http.get('https://api0.belisada.id/belisada-mongo/search/filter?st=product&q=samsung')
    .pipe(
      map(response => response as FilterM)
    );
  }
}
