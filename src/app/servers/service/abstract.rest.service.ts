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
}
