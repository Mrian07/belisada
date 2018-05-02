import { IMyDpOptions } from 'mydatepicker';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EditProfileRequest } from '@belisada/core/models';
import { DateFormatEnum } from '@belisada/core/enum';
import { DateUtil } from '@belisada/core/util';
import { UserService } from '@belisada/core/services';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  // ----- Start date picker declaration required
  today: Date = new Date();
  defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;

  myDatePickerOptions: IMyDpOptions = {
    // other options... https://github.com/kekeh/mydatepicker#options-attribute
    dateFormat: this.defaultDateFormat,
    todayBtnTxt: 'Today',
    editableDateField: false,
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    openSelectorOnInputClick: true,
    disableSince: {
      year: this.today.getFullYear() - 7,
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    }
  };
  // ----- End date picker declaration required

  createComForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private userService: UserService,
    private router: Router,
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
    this.createComForm.patchValue(
      {
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

  cancel() {
    this.router.navigate(['/buyer/profile']);
  }
}
