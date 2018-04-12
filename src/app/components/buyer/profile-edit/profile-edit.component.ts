import { IMyDpOptions } from 'mydatepicker';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { SigninRequest, UserLocalStorage, EditProfileRequest } from '../../../core/services/user/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { DateUtil } from '../../../core/util/date.util';
import { DateFormatEnum } from '../../../core/enum/date-format.enum';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  // ----- Start date picker declaration required
  now: Date = new Date();
  defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;

  myDatePickerOptions: IMyDpOptions = {
    // other options... https://github.com/kekeh/mydatepicker#options-attribute
    dateFormat: this.defaultDateFormat,
    todayBtnTxt: 'Today',
    editableDateField: false,
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableSince: {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    }
  };
  // ----- End date picker declaration required

  createComForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.fillForms();
  }

  /* Fungsi ini untuk membuat nama form */
  createFormControls() {
    this.createComForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }

  /* Fungsi ini untuk mempersiapkan form untuk diisi dengan data yang diambil dari fungsi getProfile pada service userService */
  fillForms() {
    this.userService.getProfile().subscribe(data => {
      const dob = new Date(this.dateUtil.fromDDMMYYYYtoMMDDYYY(data.dateOfBirth));
      this.createComForm.patchValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dateOfBirth: (dob instanceof Date && !isNaN(dob.valueOf())) ? {
          date: {
              year: dob.getFullYear(),
              month: dob.getMonth() + 1,
              day: dob.getDate()
            }
          } : null
      });
    });
  }

  /* Fungsi ini untuk melakukan update data profile kedalam fungsi updateProfile pada service  userService*/
  onSubmit() {
    const editProfileRequest: EditProfileRequest = new EditProfileRequest();
    editProfileRequest.name = this.createComForm.controls['name'].value;
    editProfileRequest.phone = this.createComForm.controls['phone'].value;
    editProfileRequest.gender = this.createComForm.controls['gender'].value;
    editProfileRequest.dateOfBirth =
    this.dateUtil.formatMyDate(this.createComForm.controls['dateOfBirth'].value.date, this.defaultDateFormat);
    this.userService.updateProfile(editProfileRequest).subscribe(data => {
      swal(
        'Sukses',
        'Ubah data profile berhasil.',
        'success'
      );
    });
  }
}
