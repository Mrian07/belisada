import { Injectable, OnInit } from '@angular/core';
import {
  CheckoutReq, CheckoutRes,
  CheckoutShippingAddress, SuccessTransactionRes
} from '@belisada/core/models/checkout/checkout-transaction';
import { Configuration } from '@belisada/core/config';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UpdateAsuransiReq } from '@belisada/core/models/checkout/checkout-cart';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Globals } from '../globals/globals';

@Injectable({
  providedIn: 'root',
})

export class CheckoutService {

  lat: number;
  lng: number;

  deviceInfo = null;
  device: string;

  constructor(
    private configuration: Configuration,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    public globals: Globals
    ) { }

  getShippingAddress(): Observable<CheckoutShippingAddress[]> {
    return this.http.get(this.configuration.apiURL + '/buyer/cart/shippingaddress')
      .pipe(
        map(response => response as CheckoutShippingAddress[])
      );
  }

  doCheckout(data: CheckoutReq) {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position: Position) => {
    //     if (position) {
    //       this.lat = position.coords.latitude;
    //       this.lng = position.coords.longitude;
    //     }
    //   },
    //     (error: PositionError) => console.log(error));
    // } else {
    //   alert('Geolocation is not supported by this browser.');
    // }
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (this.deviceService.isMobile()) {
      console.log('This is a Mobile Device');  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      this.device = 'Mobile';
    }
    if (this.deviceService.isTablet()) {
      console.log('This is a Tablet Device');  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      this.device = 'Tablet';
    }
    if (this.deviceService.isDesktop()) {
      console.log('This is a Desktop Device');  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      this.device = 'Desktop';
    }

    // const longitude = new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(
    //     position => { resolve(position.coords.longitude); },
    //     error => { reject(error); }
    //   );
    // }).catch(error => error);

    // const latitude = new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(
    //     position => { resolve(position.coords.longitude); },
    //     error => { reject(error); }
    //   );
    // }).catch(error => error);

    const log = {
      'longitude': (typeof this.globals.position === 'undefined') ? '' : this.globals.position.coords.longitude,
      'latitude': (typeof this.globals.position === 'undefined') ? '' : this.globals.position.coords.latitude,
      'device': this.deviceInfo.device,
      'browser': this.deviceInfo.browser,
      'browser_version': this.deviceInfo.browser_version,
      'os': this.deviceInfo.os,
      'os_version': this.deviceInfo.os_version,
      'platform': this.device
    };
    console.log('Log:', log);
    let headers: HttpHeaders = new  HttpHeaders();
    headers = headers.append('Log', JSON.stringify(log));
    console.log(headers);
    return this.http.post(this.configuration.apiURL + '/buyer/transaction/checkout', data, {headers})
      .pipe(
        map(response => response as CheckoutRes)
      );
  }

  updateAsuransi(data: UpdateAsuransiReq) {
    return this.http.post(this.configuration.apiURL + '/buyer/cart/asuransi', data)
      .pipe(
        map(response => response)
      );
  }

  getSuccessTransaction(paymentNumber): Observable<SuccessTransactionRes> {
    let params = new HttpParams();
    params = params.append('paymentNumber', paymentNumber);
    return this.http.get(this.configuration.apiURL + '/buyer/transaction/thankyoupage', {params: params})
      .pipe(
        map(response => response as SuccessTransactionRes)
      );
  }

}
