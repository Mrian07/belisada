import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Confirmation } from '@belisada/core/models/payment/payment.model';
import { DateUtil } from '@belisada/core/util';
import { DateFormatEnum } from '@belisada/core/enum';
import { IMyDpOptions } from 'mydatepicker';

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

  listBank: any[];

  isProses: Boolean = false;

  // ----- Start date picker declaration required
  today: Date = new Date();
  defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: this.defaultDateFormat,
    todayBtnTxt: 'Today',
    editableDateField: false,
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    openSelectorOnInputClick: true,
    // disableSince: {
    //   year: this.today.getFullYear() - 1,
    //   month: this.today.getMonth() + 1,
    //   day: this.today.getDate()
    // }
  };
  // ----- End date picker declaration required
  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private dateUtil: DateUtil,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.allPayment();
    this.allBank();
  }

  createFormControls() {
    this.createComForm = this.fb.group({
    paymentNumber: new FormControl('', Validators.required),
    transferTo: new FormControl('', Validators.required),
    bankId: new FormControl('', Validators.required),
    transerDate: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
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

  allBank() {
    this.paymentService.getBankUser().subscribe(respon => {
      this.listBank = respon;
      console.log('bank:', this.listBank);
    });
  }

  onSubmit() {
    // const confirmation: Confirmation = new Confirmation();
    // confirmation.paymentNumber = this.createComForm.controls['paymentNumber'].value;
    // confirmation.transferTo = this.createComForm.controls['transferTo'].value;
    // confirmation.bankId = this.createComForm.controls['bankId'].value;
    // confirmation.accountName = this.createComForm.controls['accountName'].value;
    // confirmation.accountNumber = this.createComForm.controls['accountNumber'].value;
    // confirmation.transerDate =
    // this.dateUtil.formatMyDate(this.createComForm.controls['transerDate'].value.date, this.defaultDateFormat);
    // confirmation.news = this.createComForm.controls['news'].value;
    // confirmation.nominal = this.createComForm.controls['nominal'].value;

    // console.log('confirmation', confirmation);

    const data = {
      paymentNumber: this.createComForm.controls['paymentNumber'].value,
      transferTo: this.createComForm.controls['transferTo'].value,
      bankId: this.createComForm.controls['bankId'].value,
      accountName: this.createComForm.controls['accountName'].value,
      accountNumber: this.createComForm.controls['accountNumber'].value,
      transerDate: this.dateUtil.formatMyDate(this.createComForm.controls['transerDate'].value.date, this.defaultDateFormat),
      news: this.createComForm.controls['news'].value,
      nominal: this.createComForm.controls['nominal'].value,
    };

    this.paymentService.confirmation(data).subscribe(respon => {
      console.log('respon', respon);
      if (respon.status === 1) {
        this.isProses = true;
      }
    });

  }

}
