import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

export abstract class AbstractRestService<T> {

    constructor(protected _http: HttpClient, protected actionUrl: string) {
    }

    getSingleResult(): Observable<T> {
        return this._http.get(this.actionUrl)
            .map(response => response as T);
    }
    getAll(): Observable<T[]> {
        return this._http.get(this.actionUrl)
            .map(response => response as T[]);
    }
    getById(id: number): Observable<T> {
        return this._http.get(`${this.actionUrl}/${id}`)
            .map(response => response as T);
    }
    create(data: Object): Observable<T> {
        return this._http.post(`${this.actionUrl}/create`, data)
            .map(response => response as T);
    }
    createTapiPut(data: Object): Observable<T> {
      return this._http.put(`${this.actionUrl}/create`, data)
          .map(response => response as T);
  }
    update(data: Object): Observable<T> {
        return this._http.put(`${this.actionUrl}/update`, data)
            .map(response => response as T);
    }
    delete(id: number): Observable<T> {
        return this._http.delete(`${this.actionUrl}/delete/${id}`)
            .map(response => response as T);
    }
}
