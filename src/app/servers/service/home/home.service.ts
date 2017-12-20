import { Configuration } from './../../config/configuration';
import { Injectable } from '@angular/core';
import { HomeView } from '../../model/home.view';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient, private configuration: Configuration) {  }

  getHomeThumbnail(): Observable<HomeView> {
    return this.http.get(this.configuration.serverWithApiUrl + '/home/view')
        .map(response => response as HomeView);
  }
}
