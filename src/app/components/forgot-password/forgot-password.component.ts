import { SendEmailRequest } from './../../core/services/user/models/user';
import { UserService } from './../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { SendEmailTypeEnum } from '../../core/enum/send-email-type.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  // styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  result: number = -1;
  email: FormControl;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ])
  }

  onSubmit() {
    const data: SendEmailRequest = new SendEmailRequest();
    data.email = this.email.value;
    data.type = SendEmailTypeEnum.RESET_PASSWORD;
    this.userService.sendEmail(data).subscribe(rsl => {
      // console.log(rsl.status);
      this.result = rsl.status;
    });
  }

  reEnter() {
    this.result = -1;
  }

}
