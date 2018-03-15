import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RecaptchaModule, RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
// import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../core/services/service/User/user-service.service';
import { AlertService } from '../../core/services/service/alert/alert.service';
import { User } from '../../core/services/cart/models/user';
import { PasswordValidation } from '../../shared/validators/password.validator';
// import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public declarativeFormCaptchaValue: string;
  model: any = {};
  currentUser: User;
  users: User[] = [];
  loading = false;
  password: FormControl;
  confirmPassword: FormControl;
  public reactiveForm;
  public vForValidation: FormGroup;
  firstName: FormControl;
  constructor(
    private router: Router,
    private userService: UserServiceService,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.loadAllUsers();
    this.firstName = new FormControl('', Validators.required);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.vForValidation = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
        // Validators.minLength(8)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
    ]),
    recaptchaReactive: new FormControl(null, Validators.required)
  }
  , PasswordValidation.MatchPassword
);
//   function passwordMatchValidator(g: FormGroup) {
//     return g.get('password').value === g.get('password2').value
//        ? null : {'mismatch': true};
//  }
//  console.log('asdasda', passwordMatchValidator);
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
  });
  }
   loadAllUsers() {
    if (this.password !== this.confirmPassword) {
      console.log('tidaksama');
      return false;
    }
}
  onTest(form: NgForm) {
    const model = this.vForValidation.value;
    this.loading = true;
    const tesTing = {
      firstName: model.firstName,
      email: model.email
    };
    this.userService.create(
      model
    )
        .subscribe(
            data => {
              console.log('this.alertService.success:');
              this.alertService.success('Registration successful', true);
                // this.router.navigate(['login']);
            },
            error => {
              console.log(error);
              this.alertService.error(error);
                this.loading = false;
            });
    console.log(model);

    console.log(form);
  }
  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
              this.alertService.success('Registration successful', true);
                // this.router.navigate(['login']);
            },
            error => {
              this.alertService.error(error);
                this.loading = false;
            });
}

}
