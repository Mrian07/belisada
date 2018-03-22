import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  createComForm: FormGroup;
  email: FormControl;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', Validators.required);
  }

  createForm() {
    this.createComForm = new FormGroup({
      email: this.email,
    });
  }

  onSubmit() {
    alert('proses');
  }

  sigIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}
