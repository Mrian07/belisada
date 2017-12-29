import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ParamMap, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SendEmailService } from '../../../../servers/service/sendEmail/send-email.service';
import { RegisterService } from '../../../../servers/service/register/register.service';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  private sub: any;
  success: Boolean = false;
  message: string;
  email: string;
  act_key: any;

  constructor(private sendEmail: SendEmailService, private route: ActivatedRoute,
    private register: RegisterService, private router: Router) {
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.act_key = this.route.snapshot.queryParamMap.get('key');
    console.log(this.act_key);
    this.register.activate(this.act_key).subscribe(data => {
      if (data.message) {
        this.message = data.message;
      }
      if (data.status === '1') {
        this.success = true;
      }
      console.log(data);
    });
  }
  resendEmail() {
    swal({
      title: 'Type your email here',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Resend',
      showLoaderOnConfirm: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.sendEmail.SendEmail({
          email : result.value,
          type: 'activation'
        }).subscribe(data => {
          console.log(data);
          swal({
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    });
  }
}
