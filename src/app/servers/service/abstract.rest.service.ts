import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export abstract class AbstractRestService<T> {
    constructor(protected _http: Http, protected actionUrl: string) {
    }

    getAll(): Observable<T[]> {
        return this._http.get(this.actionUrl)
            .map(resp => resp.json() as T[]);
    }
    getOne(id: number): Observable<T> {
      return this._http.get(`${this.actionUrl}${id}`)
          .map(resp => resp.json() as T);
    }
    doLogin(loginData): Observable<T> {
      return this._http.post(this.actionUrl, loginData)
          .map(resp => resp.json() as T);
    }
    searchProduct(key: string): Observable<T> {
      return this._http.get(`${this.actionUrl}${key}`)
          .map(resp => resp.json() as T);
    }
    searchByCategory(key: string, catID: number): Observable<T> {
      return this._http.get(`${this.actionUrl}${key}${catID}`)
          .map(resp => resp.json() as T);
    }
}
