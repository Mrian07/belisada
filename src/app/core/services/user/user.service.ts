import { LocalStorageEnum } from './../../enum/local-storage.enum';
import { Configuration } from './../../config/configuration';
import { User } from './../cart/models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  SignupResponse, SignupData, SigninRequest, ResetPasswdResponse, SendEmailRequest, SendEmailResponse,
  SigninResponse, ActivationRequest, ActivationResponse, EmailChecking, UserLocalStorage, UserData,
  ResetPasswdRequest, Profile, EditProfileResponse, EditProfileRequest
} from './models/user';

import 'rxjs/add/operator/map';
import { JWTUtil } from '../../util/jwt.util';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private config: Configuration,
    private jwtUtil: JWTUtil
  ) { }

  create1(user: User) {
    return this.http.post('/api/users', user);
  }
  checkEmail(data: EmailChecking): Observable<EmailChecking> {
    return this.http.post(this.config.apiURL + '/account/checkemail', data)
      .map(resp => resp as EmailChecking);
  }

  // signup(data): Observable<SignupResponse> {
  //   const sss: SignupResponse = {status: 1, msg: 'Sukses membuat akun'};
  //   const err1: SignupResponse = {status: 2, msg: 'Gagal membuat akun'};
  //   const err2: SignupResponse = {status: 3, msg: 'Gagal membuat akun'};

  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(sss);
  //     }, 1000);

  //     setTimeout(() => {
  //       observer.next(err1);
  //     }, 3000);

  //     setTimeout(() => {
  //       observer.error(err2);
  //     }, 5000);

  //   });
  // }
  signup(data: SignupData): Observable<SignupResponse> {
    return this.http.post(this.config.apiURL + '/account/create', data)
      .map(response => response as SignupResponse);
  }

  signin(request: SigninRequest): Observable<SigninResponse> {
    return this.http.post(this.config.apiURL + '/account/login', request)
      .map(response => response as SigninResponse);
  }

  activation(request: ActivationRequest): Observable<ActivationResponse> {
    return this.http.post(this.config.apiURL + '/account/activation', request)
      .map(response => response as ActivationResponse);
  }

  setUserToLocalStorage(token) {
    localStorage.setItem(LocalStorageEnum.TOKEN_KEY, token);
  }

  getUserData(token) {
    let userData: UserData = new UserData();
    userData = this.jwtUtil.parseJwt(token).UserData;
    // console.log('userData: ', userData);
    return userData;
  }

  sendEmail(data: SendEmailRequest) {
    return this.http.post(this.config.apiURL + '/account/sendemail', data)
      .map(res => res as SendEmailResponse);
  }

  resetPasswd(data) {
    return this.http.post(this.config.apiURL + '/account/resetpassword', data)
      .map(res => res as ResetPasswdResponse);
  }

  getProfile() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', localStorage.getItem('token'));
      return this.http.get(this.config.apiURL + '/profile/', { headers })
        .map(resp => resp as Profile);
  }

  updateProfile(updateData: EditProfileRequest) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('token', localStorage.getItem('token'));
      return this.http.put(this.config.apiURL + '/profile/update/', updateData, { headers })
        .map(resp => resp as EditProfileResponse);
  }

}
