import { GetResetPwdKeyRequest } from './../../core/services/user/models/user';
import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  // styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  createComForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createComForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
    });
  }

  onSubmit() {
    let data: GetResetPwdKeyRequest = this.createComForm.value;
    this.userService.getResetPwdKey(data.email).subscribe(rsl => {
      console.log('get key:', rsl);
      alert(rsl.message);
    })
  }

  sigIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}
