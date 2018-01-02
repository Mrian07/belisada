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

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  dateOfBirth: FormControl;

  user: Object;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];

  constructor(
    private profileService: ProfileService,
    private masterService: MasterService,
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.getProfile();
  }

  createFormControls() {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log('apa:'+user);
    if (!user) {
      console.log('kosong');
    }else {
      const data = JSON.parse(localStorage.user);
      // console.log('ini data: '+data.name);
        if (data) {
          this.name = new FormControl(data.name);
          this.address = new FormControl(data.address);
          this.province = new FormControl('');
          this.city = new FormControl('');
          this.district = new FormControl('');
          this.village = new FormControl('');
          this.postalcode = new FormControl('');
          this.phone = new FormControl('');
          this.ktp = new FormControl('');
          this.npwp = new FormControl('');
          this.imgAvatar = new FormControl('');
          this.imgNpwp = new FormControl('');
          this.dateOfBirth = new FormControl('');
        }
    }
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

  getProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('kosong');
    }else {
      const data = JSON.parse(localStorage.user);
      this.user=data;
    }
  }

  updateProfile(){

    const updateProfileData = {
      name : this.name,
      address: this.address,
      province: this.province,
      city: this.city,
      district: this.district,
      village: this.village,
      postalcode: this.postalcode,
      npwp : this.npwp,
      phone : this.phone,
      ktp: this.ktp,
      imageAvatar : this.imgAvatar,
      imageNPWP : this.imgNpwp,
      dateOfBirth : this.dateOfBirth,
    };

    // console.log(updateProfileData);
    // this.profileService.updateProfile(updateProfileData).subscribe(data => {
    //   if (data.status === '1') {
    //     swal(
    //       'success',
    //       data.message,
    //       'success'
    //     );
    //   }else {
    //     swal(
    //       'Opps!',
    //       data.message,
    //       'error'
    //     );
    //   }
    // });

  }

  setCanvas(e) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.path[0];
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.newImage = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');
    console.log('newImg:', this.newImage);
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
