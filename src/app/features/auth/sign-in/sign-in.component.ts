import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { filter } from 'rxjs/operators';

import { EmailChecking, SigninRequest } from '@belisada/core/models';
import { UserService } from '@belisada/core/services';
import { Subscription } from 'rxjs';

import { Store, ActionsSubject } from '@ngrx/store';
import * as UserAction from '@belisada/core/ngrx/actions/auth';
import * as UserReducer from '@belisada/core/ngrx/reducers/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SigninComponent implements OnInit {

  /* Mendeklarasikan nama variable*/
  signinFormGroup: FormGroup;
  formSubmited: Boolean = false;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  emailInvalid: number;
  viewPass: Boolean = false;
  isRemember: string;
  LoginStatus: Subscription;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private actionsSubject: ActionsSubject,
    private ngrx: Store<UserAction.Login>
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.LoginStatus = this.actionsSubject.asObservable()
    .pipe(filter(action => action.type === UserAction.LOGINSUCCESS))
    .subscribe((action: UserAction.LoginSuccess) => {
      const form = this.signinFormGroup;
      this.ngrx.select<any>(UserReducer.LoginState).subscribe( result => {
          // Handle result
        if (result.status === 0) {
          this.msg = result.message;
        } else {
          const token: string = result.token;
          if (form.value.isRemember === 'true') {
            this.userService.setUserToLocalStorage(token);
            this.userService.setRemember('true');
          } else {
            this.userService.setUserToSessionStorage(token);
            this.userService.setRemember('false');
          }
          this.router.navigateByUrl('/');
          location.reload();
        }
      }, error => {
        swal('belisada.co.id', 'unknown error', 'error');
      });
    });
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', Validators.required],
      isRemember: ['']
    });
  }

  /* Fungsi ini untuk melakukan input data sign in dengan melakukan validasi pengecekan email, password */
  onSubmit() {
    const form = this.signinFormGroup;
    this.formSubmited = true;
    if (form.valid) {

      const signinRequest: SigninRequest = form.value;
      this.ngrx.dispatch(new UserAction.TryLogin(signinRequest));
      this.formSubmited = false;
      form.reset();
      form.patchValue({email: signinRequest.email});
      this.router.navigateByUrl('/');
    }
  }

  /*Fungsi ini untuk berpindah halaman sign up jika user ingin melakukan pendaftaran*/
  goToSignUp() {
      this.router.navigateByUrl('/account/sign-up');
  }

  /* Fungsi ini untuk melakukan pengecekan email valid*/
  onSearchChange(searchValue: string) {
    const modelz = this.signinFormGroup.value;
    this.emailChecking.email = modelz.email,
    this.userService.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
        if (data.status === 1) {
          this.emailInvalid = 0;
        } else {
          this.emailInvalid = 1;
        }
      },
      error => {
          console.log('error', error);
      });
  }

  togglePass() {
    this.viewPass = !this.viewPass;
    const el = (<HTMLInputElement>document.getElementById('password'));
    if (this.viewPass) {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

}
