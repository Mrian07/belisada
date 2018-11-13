import { Injectable } from '@angular/core';
import { Configuration } from '@belisada/core/config';
import { HttpClient } from '@angular/common/http';
import { BannerResponse, BannerArrayResponse, BannerMainResponse } from '@belisada/core/models/banner/banner.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BannerService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  public getBannerTop(): Observable<BannerResponse> {
    return this.http.get(this.configuration.apiUrlMongo + '/banner/up')
      .pipe(
        map(response => response as BannerResponse)
      );
  }

  public getBannerSearch(): Observable<BannerResponse> {
    return this.http.get(this.configuration.apiUrlMongo + '/banner/search')
      .pipe(
        map(response => response as BannerResponse)
      );
  }

  public getBannerBottom(): Observable<BannerArrayResponse> {
    return this.http.get(this.configuration.apiUrlMongo + '/banner/bottom')
      .pipe(
        map(response => response as BannerArrayResponse)
      );
  }

  public getBannerMain(): Observable<BannerMainResponse> {
    return this.http.get(this.configuration.apiUrlMongo + '/banner/main')
      .pipe(
        map(response => response as BannerMainResponse)
      );
  }
}
