import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../../../core/services/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Confirmation } from '@belisada/core/models/payment/payment.model';
import { DateUtil } from '@belisada/core/util';
import { DateFormatEnum } from '@belisada/core/enum';
import { IMyDpOptions } from 'mydatepicker';
import swal from 'sweetalert2';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { DataConfirm } from '@belisada/core/models/payment/payment.model';
import { LoadingService } from '@belisada/core/services/globals/loading.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  DECIMAL_SEPARATOR = ',';
  GROUP_SEPARATOR = '.';


  list: DataConfirm;
  createComForm: FormGroup;
  nmBank: string;
  rekBank: number;
  ownerBank: string;
  transferTo: string;

  listBank: any[];

  isProses: Boolean = false;
  isConfirm: Boolean = false;

  submitted: boolean;

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
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  format(valString) {
    console.log('valString: ', valString);
    if (!valString) {
        return '';
    }
    const val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1]);
  }

  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/^0+/, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.allPayment();
    this.allBank();

    this.activatedRoute.params.subscribe((params: Params) => {

      this.createComForm.patchValue({
        paymentNumber: params['id']
      });

      this.paymentService.getConfirmation(params['id']).subscribe(respon => {

        if (respon.status === 1) {
          this.list = respon.data;
          this.isConfirm = true;
        } else {
          this.isConfirm = false;
        }
      });
    });

    // this.route.queryParams
    //   .subscribe(params => {
    //     this.createComForm.patchValue({
    //       paymentNumber: params.paymentNumber
    //     });
    //   });
  }

  createFormControls() {
    this.createComForm = this.fb.group({
      paymentNumber: new FormControl(null, Validators.required),
      transferTo: new FormControl('', Validators.required),
      bankId: new FormControl('', Validators.required),
      transerDate: new FormControl('', Validators.required),
      transferTime: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      refNo: new FormControl(''),
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
    this.submitted = true;
    this.loadingService.show();
    if (this.createComForm.valid) {

      const getTime = this.createComForm.controls['transferTime'].value;
      const hours = getTime.getHours();
      const minutes = getTime.getMinutes();

      const allTime = hours + ':' + minutes + ':' + '00';
      const allDate = this.dateUtil.formatMyDate(this.createComForm.controls['transerDate'].value.date, this.defaultDateFormat);
      const dateTime = allDate + ' ' + allTime;

      const newNominal = this.unFormat(this.createComForm.controls['nominal'].value);

      const data = {
        paymentNumber: this.createComForm.controls['paymentNumber'].value,
        transferTo: this.createComForm.controls['transferTo'].value,
        bankId: this.createComForm.controls['bankId'].value,
        accountName: this.createComForm.controls['accountName'].value,
        accountNumber: this.createComForm.controls['accountNumber'].value,
        refNo: this.createComForm.controls['refNo'].value,
        transerDate: dateTime,
        news: this.createComForm.controls['news'].value,
        nominal: newNominal,
      };

      this.paymentService.confirmation(data).subscribe(respon => {
        this.loadingService.hide();
        if (respon.status === 1) {
          this.isProses = true;
        } else {
          this.loadingService.hide();
          swal(
            'Alert',
            'Konfirmasi gagal pastikan Payment ID yang Anda masukan sudah benar.',
            'error'
          );
        }
      });

    } else {
      this.loadingService.hide();
      this.validateAllFormFields(this.createComForm);
    }

  }

  liatTransaksi() {
    this.router.navigate(['/buyer/order']);
  }


}
