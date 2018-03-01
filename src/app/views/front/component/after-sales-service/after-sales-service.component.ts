// import { EmailSendService } from './../../../../core/service/email/email-send.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SendEmailService } from '../../../../core/service/sendEmail/send-email.service';
import { EmailSend } from '../../../../core/model/email-send';
import { EmailSendService } from '../../../../core/service/email-send/email-send.service';
import swal from 'sweetalert2';
import { NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-after-sales-service',
  templateUrl: './after-sales-service.component.html',
  styleUrls: ['./after-sales-service.component.scss']
})
export class AfterSalesServiceComponent implements OnInit {
  @ViewChild('f') form: any;
  name: string;
  email: string;
  issue: string;
  company: string;
  phone: string;
  orderNumber: string;
  message: string;
  constructor(private poernaJoeal: EmailSendService) { }

  ngOnInit() {
  }
  poerna() {
    const data = {
      name: this.name,
      email: this.email,
      issue: this.issue,
      company: this.company,
      phone: this.phone,
      orderNumber: this.orderNumber,
      message: this.message
    };
    this.poernaJoeal.emailContactUs(data).subscribe(response => {
      // console.log('berhasil');
    });
  }

}
