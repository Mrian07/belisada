import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Configuration } from './../../config/configuration';
import { AbstractRestService } from '../abstract.rest.service';
import { Login } from '../../model/login';

@Injectable()
export class LoginService extends AbstractRestService<Login> {

  constructor(http: Http, configuration: Configuration) {
      super(http, configuration.serverWithAccUrl + '/account/masuk');
  }
  // addBookWithPromise(book:Book): Promise<Book> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //         let options = new RequestOptions({ headers: headers });
  //         return this.http.post(this.url, book, options).toPromise()
  //              .then(this.extractData)
  //                    .catch(this.handleErrorPromise);
  //     }
  //     private extractData(res: Response) {
  //   let body = res.json();
  //         return body.data || {};
  //     }
  //     private handleErrorObservable (error: Response | any) {
  //   console.error(error.message || error);
  //   return Observable.throw(error.message || error);
  //     }
}
