import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '@belisada/core/services/payment/payment.service';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';


class PaymentModel {
  MerchantCode: string;
  PaymentId: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  ProdDesc: string;
  UserName: string;
  UserEmail: string;
  UserContact: string;
  Remark: string;
  Lang: string;
  signature: string;
  ResponseURL: string;
  BackendURL: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild('f') f;

  v: PaymentModel = new PaymentModel();

  createForm: FormGroup;

  constructor(
    private _paymentService: PaymentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.createForm = this.fb.group({
      MerchantCode: new FormControl('', Validators.required),
      PaymentId: new FormControl('', Validators.required),
      RefNo: new FormControl('', Validators.required),
      Amount: new FormControl('', Validators.required),
      Currency: new FormControl('', Validators.required),
      ProdDesc: new FormControl('', Validators.required),
      UserName: new FormControl('', Validators.required),
      UserEmail: new FormControl('', Validators.required),
      UserContact: new FormControl('', Validators.required),
      Remark: new FormControl('', Validators.required),
      Lang: new FormControl('', Validators.required),
      signature: new FormControl('', Validators.required),
      ResponseURL: new FormControl('', Validators.required),
      BackendURL: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    // swal({
    //   type: 'info',
    //   title: 'SUBMITTED! SEE CONSOLE!'
    // });
    // document.getElementsByName('MerchantCode').value = 'ID00015';
    // document.getElementsByName('PaymentId').value = '1';
    // document.getElementsByName('RefNo').value = 'PYT-24092018-2';
    // document.getElementsByName('Amount').value = '300000';
    // document.getElementsByName('Currency').value = 'IDR';
    // document.getElementsByName('ProdDesc').value = 'Xiaomi A4';
    // document.getElementsByName('UserName').value = 'Yosi Oliver';
    // document.getElementsByName('UserEmail').value = 'yosioliver@gmail.com';
    // document.getElementsByName('UserContact').value = '085214887659';
    // document.getElementsByName('Remark').value = '';
    // document.getElementsByName('Lang').value = 'UTF-8';
    // document.getElementsByName('signature').value = 'GHIRs/2roqDM+BiLQQPPn0fkm/Q=';
    // document.getElementsByName('ResponseURL').value = 'https://dev.belisada.id/payment/response';
    // document.getElementsByName('BackendURL').value = 'https://api0.belisada.id/payment/response';
    // this.f.controls['MerchantCode'].setValue('ID00015');
    // this.f.controls['PaymentId'].setValue('1');
    // this.f.controls['RefNo'].setValue('PYT-24092018-2');
    // this.f.controls['Amount'].setValue('300000');
    // this.f.controls['Currency'].setValue('IDR');
    // this.f.controls['ProdDesc'].setValue('Xiaomi A4');
    // this.f.controls['UserName'].setValue('Yosi Oliver');
    // this.f.controls['UserEmail'].setValue('yosioliver@gmail.com');
    // this.f.controls['UserContact'].setValue('085214887659');
    // this.f.controls['Remark'].setValue('');
    // this.f.controls['Lang'].setValue('UTF-8');
    // this.f.controls['signature'].setValue('GHIRs/2roqDM+BiLQQPPn0fkm/Q=');
    // this.f.controls['ResponseURL'].setValue('https://dev.belisada.id/payment/response');
    // this.f.controls['BackendURL'].setValue('https://api0.belisada.id/payment/response');



    // this.createForm.patchValue({
      this.v.MerchantCode = 'ID00015';
      this.v.PaymentId = '1';
      this.v.RefNo = 'PYT-24092018-2';
      this.v.Amount = '300000';
      this.v.Currency = 'IDR';
      this.v.ProdDesc = 'Xiaomi A4';
      this.v.UserName = 'Yosi Oliver';
      this.v.UserEmail = 'yosioliver@gmail.com';
      this.v.UserContact = '085214887659';
      this.v.Remark = '';
      this.v.Lang = 'UTF-8';
      this.v.signature = 'GHIRs/2roqDM+BiLQQPPn0fkm/Q=';
      this.v.ResponseURL = 'https://dev.belisada.id/payment/response';
      this.v.BackendURL = 'https://api0.belisada.id/payment/response';
    // });

    this.f.nativeElement.submit();
  }

}
