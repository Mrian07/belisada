import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MasterService } from '../../../../core/service/master/master.service';
import { Profile } from '../../../../core/model/profile';

import { DatepickerOptions } from 'ng2-datepicker';
// import * as idLocale from 'date-fns/locale/id';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
    // locale: idLocale,
  };

  newImage: string;
  updateImg: Boolean = false;
  edit: any;

  createProfileForm: FormGroup;
  name: FormControl;
  address: FormControl;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  village: FormControl;
  postalcode: FormControl;
  phone: FormControl;
  ktp: FormControl;
  npwp: FormControl;
  imgAvatar: FormControl;
  imgNpwp: FormControl;
  role: any;
  dateOfBirth: FormControl;

  base64Npwp: string;
  base64Avatar: string;

  // tgl:string;
  userImgAvatar: string;
  userImageNPWP: string;

  user: Profile = new Profile();
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];

  constructor(
    private profileService: ProfileService,
    private masterService: MasterService,
  ) { }

  ngOnInit() {
      const user = JSON.parse(localStorage.user);
    // this.token = user.token;
    this.role = user.role;
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.getProfile();
    this.fillForms();
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.address = new FormControl('', Validators.required);
    this.province = new FormControl('', Validators.required);
    this.city = new FormControl('');
    this.district = new FormControl('');
    this.village = new FormControl('');
    this.postalcode = new FormControl('', Validators.required);
    this.phone = new FormControl('');
    this.ktp = new FormControl('');
    this.npwp = new FormControl('');
    this.imgAvatar = new FormControl('');
    this.imgNpwp = new FormControl('');
    // this.dateOfBirth = new FormControl(new Date());
    this.dateOfBirth = new FormControl('');
  }

  createForm() {
    this.createProfileForm = new FormGroup({
      name: this.name,
      address: this.address,
      province: this.province,
      city: this.city,
      district: this.district,
      village: this.village,
      postalcode: this.postalcode,
      phone: this.phone,
      ktp: this.ktp,
      npwp: this.npwp,
      imgAvatar: this.imgAvatar,
      imgNpwp: this.imgNpwp,
      dateOfBirth: this.dateOfBirth,
    });
  }

  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfile(luser.token).subscribe(data => {
      if (!data) {
        console.log('kosong');
      }else {
        console.log('ini data: ', data);

        this.masterService.getCity(data.regionId).subscribe(city => {
          this.cities = city;
          this.masterService.getDistrict(data.cityId).subscribe(district => {
            this.districts = district;
            this.masterService.getVillage(data.districtId).subscribe(village => {

              this.villages = village;

              this.name.setValue(data.name);
              this.address.setValue(data.address);
              this.province.setValue(this.provinces.find(x => x.mregionId === data.regionId));
              this.city.setValue(this.cities.find(x => x.mcityId === data.cityId));
              // this.city.setValue(data.cityId);
              this.district.setValue(this.districts.find(x => x.mdistrictId === data.districtId));
              this.village.setValue(this.villages.find(x => x.mvillageId === data.villageId));
              this.postalcode.setValue(data.postal);
              this.phone.setValue(data.phone);
              this.ktp.setValue(data.idcard);
              this.npwp.setValue(data.npwp);
              this.imgAvatar.setValue(data.imageAvatar);
              this.imgNpwp.setValue(data.imageNPWP);
              //this.dateOfBirth = new FormControl(new Date());
               this.dateOfBirth.setValue('2018-01-05T01:48:16.651Z');
            });
          });
        });
      }
    });
  }

  getProfile() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfile(luser.token).subscribe(data => {
      this.user = data;
      if ( data.imageAvatar ) {
        this.userImgAvatar = 'data:image/png;base64,' + data.imageAvatar;
      } else {
        this.userImgAvatar = '/assets/img/kristy.png';
      }

      if (data.imageNPWP) {
        this.userImageNPWP = 'data:image/png;base64,' + data.imageNPWP;
      } else {
        this.userImageNPWP = '/assets/img/noimage.png';
      }
      console.log('gini:', data);
    });
  }

  onSubmit() {

    // tgl = this.dateOfBirth.value.split("T17");
    // tgl = this.dateOfBirth.value;
    // console.log("tgl", this.dateOfBirth.value);
    // alert(tgl[0]);
    // console.log("this.base64Npwp", this.base64Npwp);
    const updateProfileData = {



      // name : this.name,
      // address: this.address,
      // province: this.province,
      // city: this.city,
      // district: this.district,
      // village: this.village,
      // postalcode: this.postalcode,
      // npwp : this.npwp,
      // phone : this.phone,
      // ktp: this.ktp,
      // imageAvatar : this.imgAvatar,
      // imageNPWP : this.imgNpwp,
      // dateOfBirth : this.dateOfBirth,


      name : this.name.value,
      dateOfBirth: this.dateOfBirth.value,
      address : this.address.value,
      postal: this.postalcode.value,
      villageId : this.village.value.mvillageId,
      phone : this.phone.value,
      idcard : this.ktp.value,
      npwp : this.npwp.value,
      imageAvatar : this.base64Avatar,
      imageNPWP : this.base64Npwp,
      imageIDCard : '',
    };

    if (this.name.value === '') {
      swal(
        'Opps!',
        'Nama tidak boleh kosong',
        'error'
      );
      return false;
    } else if (this.dateOfBirth.value === '') {
      swal(
        'Opps!',
        'Tanggal lahir tidak boleh kosong',
        'error'
      );
      return false;
    } else if (this.address.value === '') {
      swal(
        'Opps!',
        'Alamat tidak boleh kosong',
        'error'
      );
      return false;
    } else if (this.postalcode.value === '') {
      swal(
        'Opps!',
        'Kodepos tidak boleh kosong',
        'error'
      );
      return false;
    }

    this.profileService.updateProfile(updateProfileData).subscribe(data => {

      if (data.status === '1') {
        swal(
          'success',
          data.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }


    });

  }

  setCanvas(e) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.base64Avatar = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
    // console.log('newImg:', this.base64Avatar);
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

  setCanvasNpwp(e) {
    // console.log("e", e);
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.base64Npwp = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
    // console.log('this.base64Npwp:', this.base64Npwp);
  }

  setUrlNpwp(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

  getProvince() {
    // Country ID harcoded to Indonesia
    this.masterService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  getCity(id) {
    console.log(id);
    this.masterService.getCity(id).subscribe(data => {
      this.cities = data;
    });
  }

  getDistrict(id) {
    this.masterService.getDistrict(id).subscribe(data => {
      this.districts = data;
    });
  }

  getVillage(id) {
    this.masterService.getVillage(id).subscribe(data => {
      this.villages = data;
    });
  }

  setPostalCode(postalcode) {
    this.createProfileForm.controls['postalcode'].setValue(postalcode);
  }

}
