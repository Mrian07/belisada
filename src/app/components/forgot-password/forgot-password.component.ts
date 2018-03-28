import { ForgotPasswdRequest } from './../../core/services/user/models/user';
import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  // styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  createComForm: FormGroup;
  send: boolean;
  infoResult: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.send = false;
    this.createComForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
    });
  }

  onSubmit() {
    let data: ForgotPasswdRequest = this.createComForm.value;
    this.userService.forgotPasswd(data.email).subscribe(rsl => {
      console.log(rsl.status);
      // swal(
      //   'Alert',
      //   rsl.message,
      //   'warning'
      // );
      this.send = true;
      if (rsl.status === 1) {
        this.infoResult = 'Silakan cek email Anda ( ' + data.email + ' ) untuk melanjutkan ke tahap selanjutnya.';
      } else {
        // tslint:disable-next-line:max-line-length
        this.infoResult = 'Maaf email Anda ( ' + data.email + ' ) tidak terdaftar. Silakan masukan email Anda yang terdaftar di belisada.co.id.';
        console.log(this.infoResult);
      }
    });
  }

  sigIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}
