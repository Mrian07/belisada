import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../core/services/auth/auth.service';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DateFormatEnum } from '@belisada/core/enum';
import { Profile, EditProfileRequest } from '@belisada/core/models';
import { DateUtil } from '@belisada/core/util';
import { UserService, ShareMessageService } from '@belisada/core/services';

import { UserData } from '@belisada/core/models';
import { LocalStorageEnum } from '@belisada/core/enum';
import { LoadingService } from '@belisada/core/services/globals/loading.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

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
    maxYear: this.now.getFullYear() - 12,
    minYear: this.now.getFullYear() - 90,
    disableSince: {
      year: this.now.getFullYear() - 12,
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    }
  };
  // ----- End date picker declaration required

  /* Mendeklarasikan nama variable*/
  profile: Profile = new Profile();
  gender: string;
  isField: boolean;
  public validationOnpopUpCreateStore: FormGroup;

  updateImg: Boolean = false;
  base64Img: string;
  imageUrl: string;

  name: FormControl;
  email: FormControl;
  phone: FormControl;
  Fcgender: FormControl;
  dateOfBirth: FormControl;

  userData: UserData = new UserData();
  token: string;

  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private shareMessageService: ShareMessageService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem(LocalStorageEnum.TOKEN_KEY);
    this.isField = false;
    this.validationOnpopUpCreateStore = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    dateOfBirth: new FormControl(null, Validators.required)
  });

    this.fillForms();
    this.loadData();
  }

   /* Fungsi ini untuk membuat nama form */

  keyLa(event: any) {
    const pattern = /[a-zA-Z ]+/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /* Fungsi ini untuk mempersiapkan form untuk diisi dengan data yang diambil dari fungsi getProfile pada service userService */
  fillForms() {
    this.userService.getProfile().subscribe(data => {
    const dob = new Date(this.dateUtil.fromDDMMYYYYtoMMDDYYY(data.dateOfBirth));
    if (data.imageAvatarUrl) {
      this.imageUrl = data.imageAvatarUrl;
    } else {
      this.imageUrl = 'assets/img/profile-buyer.jpg';
    }

    this.validationOnpopUpCreateStore.patchValue(
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

  /* Fungsi ini untuk melakukan penarikan data melalui fungsi getProfile() yang berada pada userService */
  loadData() {
    this.userService.getProfile().subscribe(data => {
      this.profile = data;
      if (data.gender === 'M') {
          this.gender = 'Laki-laki';
      } if ( data.gender === 'F') {
          this.gender = 'Perempuan';
      }
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
      return !this.validationOnpopUpCreateStore.get(field).valid && this.validationOnpopUpCreateStore.get(field).touched;
  }

  /* Fungsi ini untuk melakukan update data profile kedalam fungsi updateProfile pada service  userService*/
  onSubmit(form: NgForm) {
    this.loadingService.show();
    if (this.validationOnpopUpCreateStore.valid) {
      const model = this.validationOnpopUpCreateStore.value;
        const editProfileRequest: EditProfileRequest = new EditProfileRequest();
    if (this.base64Img) { editProfileRequest.imageAvatarUrl = this.base64Img; }
      editProfileRequest.name = this.validationOnpopUpCreateStore.controls['name'].value;
      editProfileRequest.phone = this.validationOnpopUpCreateStore.controls['phone'].value;
      editProfileRequest.gender = this.validationOnpopUpCreateStore.controls['gender'].value;
      editProfileRequest.dateOfBirth =
      this.dateUtil.formatMyDate(this.validationOnpopUpCreateStore.controls['dateOfBirth'].value.date, this.defaultDateFormat);

      this.userService.updateProfile(editProfileRequest).subscribe(data => {
        this.authService.refreshToken().subscribe(respon => {
          this.loadingService.hide();
          console.log('status', respon.status);
          if (respon.status === 1) {
            // if (localStorage.getItem('isRemember') === 'true') {
              this.userService.setUserToLocalStorage(respon.token);
            // } else {
            //   this.userService.setUserToSessionStorage(respon.token);
            // }

            swal(
              'Sukses',
              'Ubah data profile berhasil.',
              'success'
            );
            this.loadData();
            this.isField = false;
            this.shareMessageService.changeMessage('update-profile');
          }
        });
      });
    } else {
      console.log(this.validationOnpopUpCreateStore.valid);
        // swal('ops maaf ada kesalahan silahkan cek data kamu');
        this.validateAllFormFields(this.validationOnpopUpCreateStore);
    }

  }

  /* Fungsi ini untuk berpindah halaman ke halaman edit */
  edit() {
    this.isField = true;
  }

  phoneCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  setUrl(event, img) {
    // consol
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    // this.onViewDesc = false;
    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      that.base64Img = fr.result;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}


