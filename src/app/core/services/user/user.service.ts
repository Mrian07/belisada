import { LocalStorageEnum } from './../../enum/local-storage.enum';
import { Configuration } from './../../config/configuration';
import { User, UserSignupGuest } from './../cart/models/user';
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

  /*
    with Model User
    check email is using by signUp Components for checking email if
    email is existing from backend
  */
  checkEmail(data: EmailChecking): Observable<EmailChecking> {
    return this.http.post(this.config.apiURL + '/account/checkemail', data)
      .map(resp => resp as EmailChecking);
  }

  /*
    with Model User
    signUp is using by SignUp Components For signUP to back end
  */

  signup(data: SignupData): Observable<SignupResponse> {
    return this.http.post(this.config.apiURL + '/account/create', data)
      .map(response => response as SignupResponse);
  }

  /*
    with Model User
    SignIn is using by signIn Components For SignIn To web
  */

  signin(request: SigninRequest): Observable<SigninResponse> {
    return this.http.post(this.config.apiURL + '/account/login', request)
      .map(response => response as SigninResponse);
  }

  /*
    With Model User
    Activation Is using by signUp-Activation
  */

  activation(request: ActivationRequest): Observable<ActivationResponse> {
    return this.http.post(this.config.apiURL + '/account/activation', request)
      .map(response => response as ActivationResponse);
  }

  /*
    setUserToLocalStorage is using by SignIn Components for saving User to Local Storage
  */

  setUserToLocalStorage(token) {
    localStorage.setItem(LocalStorageEnum.TOKEN_KEY, token);
  }

  /*
    getUserData is using by 2 components ( header components and signin components )
    to get user data from localstorage
  */

  getUserData(token) {
    let userData: UserData = new UserData();
    userData = this.jwtUtil.parseJwt(token).UserData;
    return userData;
  }

  /*
    sendEmail is using by SignUp Activation and Forgot Password to sendemail
  */

  sendEmail(data: SendEmailRequest) {
    return this.http.post(this.config.apiURL + '/account/sendemail', data)
      .map(res => res as SendEmailResponse);
  }

  /*
    with model User and class ResetPasswdResponse
    resetPasswd is using by reset password components

  */

  resetPasswd(data) {
    return this.http.post(this.config.apiURL + '/account/resetpassword', data)
      .map(res => res as ResetPasswdResponse);
  }

  /*
    with model User And class Profile
    getProfile is using by 2 Components ( Profile Edit and Profile Components )
  */

  getProfile() {
      return this.http.get(this.config.apiURL + '/profile/')
        .map(resp => resp as Profile);
  }

  createFormGuest(data: SignupData): Observable<UserSignupGuest> {
    return this.http.post(this.config.apiURL + '/store/create', data)
      .map(response => response as UserSignupGuest);
  }

    /*
      updateProfile is using by Profile Edit components
    */

  updateProfile(updateData: EditProfileRequest) {
      return this.http.put(this.config.apiURL + '/profile/update/', updateData)
        .map(resp => resp as EditProfileResponse);
  }

}
