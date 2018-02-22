import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { SendEmailService } from '../../../../../core/service/sendEmail/send-email.service';

@Component({
  selector: 'app-m-lost-password',
  templateUrl: './m-lost-password.component.html',
  styleUrls: ['./m-lost-password.component.scss']
})
export class MLostPasswordComponent implements OnInit {

  porgot: any[];
  type = 'resetpassword';
  email: string;

  constructor(private http: HttpClient, private sendEmailService: SendEmailService) { }

  ngOnInit() {
  }

  forgot() {

    const registerData = {
      email : this.email,
      type : this.type
    };

    console.log(registerData);
    this.sendEmailService.SendEmail(registerData).subscribe(data => {
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