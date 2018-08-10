import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  createComForm: FormGroup;
  nmBank: string;
  rekBank: number;
  ownerBank: string;
  transferTo: string;

  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.allPayment();
  }

  createFormControls() {
    this.createComForm = this.fb.group({
    paymentId: new FormControl('', Validators.required),
    transferTo: new FormControl('', Validators.required),
    transferFrom: new FormControl('', Validators.required),
    rekOwner: new FormControl('', Validators.required),
    rekNum: new FormControl('', Validators.required),
    nominal: new FormControl('', Validators.required),
    news: new FormControl('', Validators.required)
    });
  }

  allPayment() {
    this.paymentService.getPayment().subscribe(respon => {
      this.createComForm.patchValue(
        {
          transferTo: respon[0].data[0].bankName + '-' + respon[0].data[0].accountNumber + '-' + respon[0].data[0].accountName,
        });
    });
  }

}
