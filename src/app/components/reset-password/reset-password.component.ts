import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  createComForm: FormGroup;
  password: FormControl;
  password_repeat: FormControl;

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe( params => {
      // this.transactionId = params.id;
      console.log(params.id);
    });
  }
  createFormControls() {
    this.password = new FormControl('', Validators.required);
    this.password_repeat = new FormControl('', Validators.required);
  }

  createForm() {
    this.createComForm = new FormGroup({
      password: this.password,
      password_repeat: this.password_repeat,
    });
  }

  onSubmit() {
    alert('proses');
  }

}
