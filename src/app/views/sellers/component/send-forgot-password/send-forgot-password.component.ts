import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { SendEmailService } from '../../../../core/service/sendEmail/send-email.service';
import { ForgotPasswordService } from '../../../../core/service/forgotpassword/forgot-password.service';

@Component({
  selector: 'app-send-forgot-password',
  templateUrl: './send-forgot-password.component.html',
  styleUrls: ['./send-forgot-password.component.scss']
})
export class SendForgotPasswordComponent implements OnInit {
  registernih: any[];
  act_key: string;
  password: string;

  constructor(private sendEmail: SendEmailService,
    private route: ActivatedRoute,
    private forgotPassowrd: ForgotPasswordService) {
    this.route.params.subscribe( params => {
      this.act_key = params.key;
      console.log('ini datanya,', params);
    });
  }

  ngOnInit() {
  }

  pazz() {
    const registernih = {
      password : this.password,
      key : this.act_key,
    };
    console.log(registernih);
    this.forgotPassowrd.fgtPassword(registernih).subscribe(data => {
      if (data.status === '1') {
        swal(
          'success',
          data.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }
  });
  }

}
