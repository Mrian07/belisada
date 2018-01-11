import { BillingAddress } from './../../../../core/model/billing-address';
import { BilingAddressService } from './../../../../core/service/billing-address/biling-address.service';
import { MasterService } from './../../../../core/service/master/master.service';
import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import swal from 'sweetalert2';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shiping-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {
  createComForm: FormGroup;
   name: FormControl;
    address: FormControl;
    addressName: FormControl;
    postalCode: FormControl;
    vilaggeId: FormControl;
    phone: FormControl;
    addressType: FormControl;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  // village: FormControl;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];


  // perusahaan: Observable<any>;

  kelurahan = [];
  // bidang: Bidang[];
  categories = [];
  selectedProvince: string;

  constructor(private masterService: MasterService, private iniService: BilingAddressService ) { }

  ngOnInit() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    console.log('kampret1', luser);
  }

  getToken() {
    const json = localStorage.user;
    if (json) {
      const user = JSON.parse(localStorage.user);
      return user.token;
    }
  }
  createFormControls() {
    this.name = new FormControl('');
    this.address = new FormControl('');
    this.addressType = new FormControl('');
    this.addressName = new FormControl('');
    this.phone = new FormControl('');
    this.city = new FormControl('');
    this.province = new FormControl('');
    this.district = new FormControl('');
    this.vilaggeId = new FormControl('');
    this.postalCode = new FormControl('');

  }

  createForm() {
    this.createComForm = new FormGroup({
      name: this.name,
      address: this.address,
      addressType: this.addressType,
      addressName: this.addressName,
      phone: this.phone,
      city: this.city,
      province: this.province,
      district: this.district,
      vilaggeId: this.vilaggeId,
      postalCode: this.postalCode,
    });
  }
  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      // asdsad
      name: model.name,
      address: model.address,
      addressType: model.addressType,
      addressName: model.addressName,
      phone: model.phone,
      city: model.city,
      province: model.province,
      // this.selectedCategory.mbankId
      district: model.district,
      postal: model.postalCode,
      // villageId: model.village.mvillageId,
      villageId: model.vilaggeId.mvillageId
      // asdasd2
    };
    this.iniService.create(data).subscribe(response => {
      console.log('ini submit ', response);
      this.createComForm.reset();
      if (response.status === '1') {
        swal(
          'success',
          response.message,
          'success'
        );
      }else {
        swal(
          'Opps!',
          response.message,
          'error'
        );
      }
      // this.getAllStore();
    });
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
    this.createComForm.controls['postalCode'].setValue(postalcode);
  }

}
