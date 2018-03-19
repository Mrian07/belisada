import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomAlert } from './alert';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;
  fm: any = {};

  constructor() { }

  ngOnInit() {
    // const a = new CustomAlert();
    // a.show('This is just a test...');
  }

  fillForms() {

    this.fm = {
      email : 'email',
      password: 'password',
    }

  }

  tombolAlert() {
    const a = new CustomAlert();
    a.show('This is just a test...');
  }

}
