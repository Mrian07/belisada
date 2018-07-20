import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home } from '@belisada/core/models';

@Injectable({
  providedIn: 'root'
})
export class HomeSService {

  constructor(private cfg: Configuration, private http: HttpClient) { }
  getHomeNew(): Observable<Home[]> {
    return this.http.get(this.cfg.apiURL + '/home/new/')
      .pipe(
        map(response => response as Home[])
      );
  }

  getHomePopular(): Observable<Home[]> {
    return this.http.get(this.cfg.apiURL + '/home/popular/')
      .pipe(
        map(response => response as Home[])
      );
  }

  getProduct(url) {
    return this.http.get(this.cfg.imgUrl163x179 + '/' + url);
  }
}
