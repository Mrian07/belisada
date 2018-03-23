import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RecaptchaModule, RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import { Router } from '@angular/router';
import { User } from '../../core/services/cart/models/user';
import { SignupData, EmailChecking } from '../../core/services/user/models/user';
import { PasswordValidation } from '../../shared/validators/password.validator';
import { UserService } from '../../core/services/user/user.service';
import swal from 'sweetalert2';
import { LowerCasePipe } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public declarativeFormCaptchaValue: string;
  currentUser: User;
  users: User[] = [];
  signupData: SignupData = new SignupData();
  emailChecking: EmailChecking = new EmailChecking();
  loading = false;
  title = true;
  emailToSuccess: string;
  message: string;
  status: string;
  phoneNumber: FormControl;
  password: FormControl;
  email: FormControl;
  isSubscribe = new FormControl(true);
  confirmPassword: FormControl;
  public reactiveForm;
  public vForValidation: FormGroup;
  fullname: FormControl;
  constructor(
    private router: Router,
    private userservice: UserService,
    // private alertService: AlertService,
    private fb: FormBuilder
    // private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.vForValidation = this.fb.group(
      {
        isSubscribe: new FormControl(''),
        fullname: new FormControl(null, Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]),
        phoneNumber: new FormControl('', [
          Validators.pattern('[0-9]+')
        ]),
        recaptchaReactive: new FormControl(null, Validators.required)
      },
      {validator: PasswordValidation.MatchPassword}
    );
  }
  changeValue() {
    console.log(this.isSubscribe.value);
    this.isSubscribe = new FormControl(!this.isSubscribe.value);
}
  checkEmail() {
    const modelz = this.vForValidation.value;
    this.emailChecking.email = modelz.email,
    console.log( this.emailChecking.email);
    this.userservice.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
      },
      error => {
        console.log('error', error);
      });
  }

  submit() {
    const model = this.vForValidation.value;
    this.loading = true;
    this.signupData.name = model.fullname;
    this.signupData.email = model.email;
    this.signupData.phone = model.phoneNumber;
    this.signupData.password = model.password;
    this.signupData.isSubscribe = model.isSubscribe;
    this.userservice.signup(this.signupData)
      .subscribe(
        (response) => {
          if (response.status === 1) {
            this.emailToSuccess = this.signupData.email;
            this.loading = false;
            this.title = false;
          } else {
            swal({
              type: 'error',
              
              title: 'Oops...',
              text: response.message,
            });
        }
        }, (error) =>
        swal({
          type: 'error',
          title: 'Oops...',
          text: error,
        })
      );
    this.vForValidation.reset();
  }
}
