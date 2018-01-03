import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { TokenService } from '../service/token/token.service';
import { Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private inj: Injector, private routes: Router, private location: Location) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(TokenService);
    const token = auth.getToken();
    const sendtoken = {
      token : token
    } ;

    request = request.clone({
      setHeaders: {
       token: `${auth.getToken()}`
       //token: 'eyJhbGciOiJIUzUxMiJ9.eyJVc2VyRGF0YSI6eyJyb2xlIjo1LCJuYW1lIjoiQnVkaSBLdXN1bWEgVXRhbWEiLCJhdmF0YXIiOiIiLCJlbWFpbCI6ImJka3VzdW1hQGdtYWlsLmNvbSJ9LCJzdWIiOiJiZGt1c3VtYUBnbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MTQ4NjI3MzAsImV4cCI6MTUxNDk0OTEzMH0.VpmQjFb3mLKgeyRw_ttH8q__Oi7IUHh-2xU2P269ST0QL4GBg5YA32g8Y9p7EXNnfrsMAzXvwRZfx0qe2aq0iQ'
      }
    });

    // return next.handle(request)
    // .do(event => {
    //   console.log(event);
    //   if (event instanceof HttpResponse) {
    //    // this.logger.logDebug(event);
    //    console.log('valid');
    //   }
    // })
    // .catch(err => {
    //   console.log('Caught error', err);
    //   return Observable.throw(err);
    // });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //auth.direct();
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // swal('Session Expired, Anda Harus Login ulang')
          // .then((result) => {
          //   auth.redirect();
          // });
        }
      }
    });

  }
}
