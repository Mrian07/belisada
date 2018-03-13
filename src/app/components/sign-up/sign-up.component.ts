import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RecaptchaModule, RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
// import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public declarativeFormCaptchaValue: string;
  public reactiveForm;
  constructor() { }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
  });
  }

}
