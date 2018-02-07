import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import { Province } from './../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MasterService } from '../../../../core/service/master/master.service';
import { Profile } from '../../../../core/model/profile';
import { DatepickerOptions } from 'ng2-datepicker';
import { Title } from '@angular/platform-browser';
import { ShareService } from '../../../../core/service/shared.service';
import { DatePipe } from '@angular/common';
import { FlagService } from '../../../../core/service/flag.service';


@Component({
  selector: 'app-profile-buyer',
  templateUrl: './profile-buyer.component.html',
  styles: [`/deep/ .ngx-datepicker-container .ngx-datepicker-input{ width: 100% !important; }`],
  styleUrls: ['./profile-buyer.component.scss'],

})
export class ProfileBuyerComponent implements OnInit {

  options: DatepickerOptions = {
    minYear: 1970,
    displayFormat: 'DD MMM YYYY',
  };

  updateImg: Boolean = false;

  role: any;

  // tgl:string;
  userImgAvatar: string;
  userImageKTP: string;
  userImageNPWP: string;
  optionTemplate;
  user: Profile = new Profile();
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  fm: any = {};
  adr: any = {};
  dob: Date;
  lang: any;

  message: string;

  constructor(
    private profileService: ProfileService,
    private masterService: MasterService,
    private title: Title,
    private sharedService: ShareService,
    private datePipe: DatePipe,
    private flagService: FlagService
  ) { }

  ngOnInit() {
    localStorage.setItem('languange', this.lang);
    this.title.setTitle('Belisada Seller -Profile');
    const user = JSON.parse(localStorage.user);
    // this.token = user.token;
    this.role = user.role;
    this.getProvince(this.fillForms.bind(this));
  }

  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfileBuyer(luser.token).subscribe(data => {

      // console.log('batan', data);

      if (!data) {
        return console.log('kosong');
      }
      // console.log('ini data: ', data);
      if (data.dateOfBirth && data.dateOfBirth != '') {
        let tl = data.dateOfBirth.split('-');
        if (tl.length == 3) {
          this.dob = new Date(+(tl[2]), (+(tl[1]) - 1), +(tl[0]));
        }
      }

      this.fm = {
        name : data.name,
        address: data.address,
        postal: data.postal,
        npwp : data.npwp,
        phone : data.phone,
        idcard: data.idcard,
        villageId: data.villageId,
      }
      this.adr = {
        province: this.provinces.find(x => {return x.mregionId==data.regionId}),
      };
      if(data.cityId) {
        this.masterService.getCity(data.regionId).subscribe(city => {
          this.cities = city;
          this.adr.city = this.cities.find(x => x.mcityId === data.cityId);
          this.masterService.getDistrict(data.cityId).subscribe(district => {
            this.districts = district;
            this.adr.district = this.districts.find(x => x.mdistrictId === data.districtId);
            this.masterService.getVillage(data.districtId).subscribe(village => {
              this.villages = village;
              this.adr.village = this.villages.find(x => {return x.mvillageId==data.villageId});
            });
          });
        });
      }
      this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
      this.userImageKTP = data.imageIDCard ? 'data:image/png;base64,' + data.imageIDCard : '/assets/img/noimage.png';
      this.userImageNPWP = data.imageNPWP ? 'data:image/png;base64,' + data.imageNPWP : '/assets/img/noimage.png';
      const sharedData = {
        image: this.userImgAvatar,
        name: this.fm.name,
        email: this.fm.email
      };
      this.sharedService.shareData = sharedData;
      // console.log(sharedData);
    });
  }

  setDOB(d) {
    this.fm.dateOfBirth = this.datePipe.transform(d, 'dd-MM-yyyy');
    // console.log('newDOB:', this.fm.dateOfBirth);
  }

  onSubmit() {
   // console.log('submit data:', this.fm);

    this.profileService.updatebuyerProfile(this.fm).subscribe(data => {

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

  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

    this.profileService.updatebuyerProfile(this.fm).subscribe(data => {

      if (data.status === '1') {
        swal(
          'Success',
          'Upload Photo berhasil',
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

    this.flagService.changeMessage('upload-photo');
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

  getProvince(cb) {
    // Country ID harcoded to Indonesia
    this.masterService.getProvince('209').subscribe(data => {
      this.provinces = data;
      if(typeof cb=='function') cb();
    });
  }

  getCity(id) {
    // console.log(id);
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

  setVilage(option) {
    this.fm.villageId = option.mvillageId;
    this.fm.postal = option.kodepos;
  }

}
