import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Observable ,  BehaviorSubject ,  Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LowerCasePipe } from '@angular/common';
import { User, SignupData, EmailChecking } from '@belisada/core/models';
import { UserService, AuthService } from '@belisada/core/services';
import { PasswordValidation } from '@belisada/shared/validators';

import { Store, ActionsSubject } from '@ngrx/store';
import * as UserAction from '@belisada/core/ngrx/actions/user';
import * as UserReducer from '@belisada/core/ngrx/reducers/user';

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
  status: number;
  phoneNumber: FormControl;
  password: FormControl;
  email: FormControl;
  isSubscribe = new FormControl(true);
  confirmPassword: FormControl;
  public reactiveForm;
  public vForValidation: FormGroup;
  fullname: FormControl;
  RegStatus: Subscription;
  constructor(
    private router: Router,
    private userservice: UserService,
    private fb: FormBuilder,
    private actionsSubject: ActionsSubject,
    private ngrx: Store<UserAction.SignUpBuyer>,
    private authService: AuthService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.checkIsLogin();
    //   this.checkEmail();
    this.vForValidation = this.fb.group({
        isSubscribe: new FormControl(false),
        fullname: new FormControl('',
        [Validators.required,
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(7)
        ]),
      // password match validation dokumentasi  confirmPassword: new FormControl('', [
      //     //   Validators.required
      //   ]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-_]{2,}[.]{1}[a-zA-Z]{2,}')
        ]),

        /*
        berguna untuk dokumentasi recaptcha dan phone number
        dokumentasi
        //   phoneNumber: new FormControl('', [
        //       Validators.pattern('[0-9]+')
        //   ]),
        //   recaptchaReactive: new FormControl(null, Validators.required)
        */

    }, {
      // password matchvalidation dokumentasi  validator: PasswordValidation.MatchPassword,
      //   updateOn: 'blur'
    });
    this.RegStatus = this.actionsSubject.asObservable()
      .pipe(filter(action => action.type === UserAction.SIGNUPBUYERSUCCESS))
        .subscribe((action: UserAction.SignUpBuyerSuccess) => {
          // console.log('reg success');
          this.ngrx.select<any>(UserReducer.SignUpBuyerState).subscribe(
            response => {
              console.log(response);
              // if (response.status === 1) {
                  this.emailToSuccess = this.signupData.email;
                  this.loading = false;
                  this.title = false;
              // } else {
              //     swal({
              //         type: 'error',
              //         title: 'gagal...',
              //         text: response.message,
              //     });
              // }
          });
        });
  }
  checkIsLogin() {
    if (this.authService.getToken()) {
      this.router.navigateByUrl('/buyer/profile');
    }
  }
  changeValue() {
      this.isSubscribe = new FormControl(!this.isSubscribe.value);
  }
  goToSignIn() {
      this.router.navigateByUrl('/account/sign-in');
  }
  checkEmail() {
      const modelz = this.vForValidation.value;
      this.emailChecking.email = modelz.email,
          this.userservice.checkEmail(this.emailChecking)
          .subscribe(
              data => {
                  if (data.status === 1) {
                      this.message = data.message;
                      this.status = data.status;
                  } else {
                      console.log('its Good');
                  }
              },
              error => {
                  console.log('error', error);
              });
  }
  onSearchChange(searchValue: string) {
      const modelz = this.vForValidation.value;
      this.emailChecking.email = modelz.email,
          this.userservice.checkEmail(this.emailChecking)
          .subscribe(
              data => {
                  if (data.status !== 1) {
                      this.message = data.message;
                      this.status = data.status;
                  } else {
                      console.log('its Good');
                  }
              },
              error => {
                  console.log('error', error);
              });
  }

  keyLa(event: any) {
    const pattern = /[a-zA-Z ]+/;
    console.log('aaaaaa', event);

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && event.keyCode !== 9   && !pattern.test(inputChar)) {
        event.preventDefault();
    }
}

  keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;

      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
          event.preventDefault();
      }
  }

  submit(form: NgForm) {
      const model = this.vForValidation.value;
      this.loading = true;
      this.signupData.name = model.fullname;
      this.signupData.email = model.email;
      this.signupData.phone = model.phoneNumber;
      this.signupData.password = model.password;
      this.signupData.isSubscribe = model.isSubscribe;
      this.ngrx.dispatch(new UserAction.SignUpBuyer(this.signupData));
      // console.log(form);
      this.vForValidation.reset();
  }
}
