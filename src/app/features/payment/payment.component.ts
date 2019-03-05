import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '@belisada/core/services/payment/payment.service';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ModalService } from '@belisada/shared/components/modal/modal.service';
import { MidtransService } from '@belisada/core/services/midtrans/midtrans.service';
import { TransactionDetails, CreditCard, MidtransRequest } from '@belisada/core/models';
import { tick } from '@angular/core/src/render3';
import { LoadingService } from '@belisada/core/services/globals/loading.service';


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

  private bodyText: string;

  constructor(
    private _paymentService: PaymentService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private midtransService: MidtransService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    // this.v.MerchantCode = '';
    // this.v.PaymentId = '';
    // this.v.RefNo = '';
    // this.v.Amount = '';
    // this.v.Currency = '';
    // this.v.ProdDesc = '';
    // this.v.UserName = '';
    // this.v.UserEmail = '';
    // this.v.UserContact = '';
    // this.v.Remark = '';
    // this.v.Lang = '';
    // this.v.signature = '';
    // this.v.ResponseURL = '';
    // this.v.BackendURL = '';
    // this.form();

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

    this.payMitrans();
  }

  payMitrans() {
    const data1: TransactionDetails = new TransactionDetails();
    data1.order_id = 'PYT-15022019-5';
    data1.gross_amount = 17000;

    const data2: CreditCard = new CreditCard();
    data2.secure = true;
    const data: MidtransRequest = new MidtransRequest();

    data.transaction_details = data1;
    data.credit_card = data2;

    console.log('ini', data);

    this.midtransService.getPay(data).subscribe((response) => {
      console.log(response);
    });
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
    this.loadingService.show();
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


    // this.createForm.patchValue(
    //   {
    //     MerchantCode: '',
    //     PaymentId: '1',
    //     RefNo: '',
    //     Amount: '',
    //     Currency: '',
    //     ProdDesc: '',
    //     UserName: '',
    //     UserEmail: '',
    //     UserContact: '',
    //     Remark: '',
    //     Lang: '',
    //     signature: '',
    //     ResponseURL: '',
    //     BackendURL: '',
    //   }
    // );

    // this.createForm.patchValue({
    // });

    this.f.nativeElement.submit();
    this.loadingService.hide();
  }

  setValue() {
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
  }

  // ngOnInit() {
  //     this.bodyText = 'This text can be updated in modal 1';
  // }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
