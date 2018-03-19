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
  createComForm: FormGroup;

  email: FormControl;
  password: FormControl;
  // fm: any = {};

  constructor(
    // private router: Router,
  ) { }

  ngOnInit() {
    // const a = new CustomAlert();
    // a.show('This is just a test...');
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm() {
    this.createComForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    alert('sssss');
  }

  // fillForms() {

  //   this.fm = {
  //     email : 'email',
  //     password: 'password',
  //   }

  // }

  tombolAlert() {
    const a = new CustomAlert();
    a.show('This is just a test...');
  }

}
