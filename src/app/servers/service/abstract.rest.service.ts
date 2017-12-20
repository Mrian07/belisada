import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export abstract class AbstractRestService<T> {
  constructor(protected _http: HttpClient, protected actionUrl: string) {
  }

    getAll(): Observable<T[]> {
        return this._http.get(this.actionUrl)
            .map(response => response as T[]);
    }
    getOne(id: number): Observable<T> {
      return this._http.get(`${this.actionUrl}${id}`)
          .map(response => response as T);
    }
    doLogin(loginData): Observable<T> {
      return this._http.post(this.actionUrl, loginData)
          .map(response => response as T);
    }
    doRegister(registerData): Observable<T> {
        return this._http.post(this.actionUrl, registerData)
            .map(response => response as T);
      }

    // searchByCategory(key: string, catID: number): Observable<T> {
    //   return this._http.get(`${this.actionUrl}${key}${catID}`)
    //       .map(response => response as T);
    // }
}
