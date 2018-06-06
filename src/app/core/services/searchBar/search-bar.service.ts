import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Configuration } from './../../config/configuration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor(private cfg: Configuration, private http: HttpClient) { }
  search(key: string) {
    return this.http.get(this.cfg.apiURL2 + '/search?st=product&q=' + key);
  }
}
