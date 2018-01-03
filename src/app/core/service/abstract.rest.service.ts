import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export abstract class AbstractRestService<T> {

    constructor(protected _http: HttpClient, protected actionUrl: string) {
    }

    getAll(jsonHeaders): Observable<T[]> {
        jsonHeaders['content-type'] = 'application/json';
        const headers = new HttpHeaders(jsonHeaders);
        return this._http.get(this.actionUrl, {headers})
            .map(response => response as T[]);
    }
    getById(id: number, jsonHeaders): Observable<T> {
        jsonHeaders['content-type'] = 'application/json';
        const headers = new HttpHeaders(jsonHeaders);
        return this._http.get(`${this.actionUrl}/${id}`, {headers})
            .map(response => response as T);
    }
    create(data: Object, jsonHeaders): Observable<T> {
        jsonHeaders['content-type'] = 'application/json';
        const headers = new HttpHeaders(jsonHeaders);
        return this._http.post(`${this.actionUrl}/create`, data, {headers})
            .map(response => response as T);
    }
    update(data: Object, jsonHeaders): Observable<T> {
        jsonHeaders['content-type'] = 'application/json';
        const headers = new HttpHeaders(jsonHeaders);
        return this._http.put(`${this.actionUrl}/update`, data, {headers})
            .map(response => response as T);
    }
    delete(id: number, jsonHeaders): Observable<T> {
        jsonHeaders['content-type'] = 'application/json';
        const headers = new HttpHeaders(jsonHeaders);
        return this._http.delete(`${this.actionUrl}/delete/${id}`, {headers})
            .map(response => response as T);
    }
    test(data: Object, jsonHeaders): Observable<T> {
      jsonHeaders['content-type'] = 'application/json';
      const headers = new HttpHeaders(jsonHeaders);
      return this._http.post(`${this.actionUrl}/update`, data, {headers})
          .map(response => response as T);
  }
}
