import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Confirmation } from '@belisada/core/models/payment/payment.model';
import { DateUtil } from '@belisada/core/util';
import { DateFormatEnum } from '@belisada/core/enum';
import { IMyDpOptions } from 'mydatepicker';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.allPayment();
    this.allBank();

    this.route.queryParams
      .subscribe(params => {
        this.createComForm.patchValue({
          paymentNumber: params.paymentNumber
        });
      });
  }

  createFormControls() {
    this.createComForm = this.fb.group({
      paymentNumber: new FormControl(null, Validators.required),
      transferTo: new FormControl('', Validators.required),
      bankId: new FormControl('', Validators.required),
      transerDate: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      nominal: new FormControl('', Validators.required),
      news: new FormControl('')
    });
  }

  numberCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
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
      console.log('bank:git st', this.listBank);
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
          control.markAsTouched({
              onlySelf: true
          });
      } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.createComForm.get(field).valid && this.createComForm.get(field).touched;
  }

  onSubmit() {

    if (this.createComForm.valid) {
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
        if (respon.status === 1) {
          this.isProses = true;
        } else {
          swal(
            'Alert',
            'Konfirmasi gagal pastikan Payment ID yang Anda masukan sudah benar.',
            'error'
          );
        }
      });

    } else {
          this.validateAllFormFields(this.createComForm);
    }

  }

  liatTransaksi() {
    this.router.navigate(['/buyer/order']);
  }


}
