import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RecaptchaModule, RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
// import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../core/services/service/User/user-service.service';
// import { AlertService } from '../../core/services/service/alert/alert.service';
// import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public declarativeFormCaptchaValue: string;
  model: any = {};
  loading = false;
  public reactiveForm;
  public vForValidation: FormGroup;
  firstName: FormControl;
  constructor(
    // private router: Router,
    private userService: UserServiceService,
    // private alertService: AlertService
  ) { }

  ngOnInit() {
    this.firstName = new FormControl('', Validators.required);
    this.vForValidation = new FormGroup({
      firstName: new FormControl(null, Validators.required),
  });
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
  });
  }
  onTest(form: NgForm) {
    console.log(form);
  }
  register() {
    this.loading = true;
    this.userService.create(this.model)
        .subscribe(
            data => {
              console.log('sukese');
                // this.router.navigate(['login']);
            },
            error => {
              console.log('failure');
                this.loading = false;
            });
}

}
