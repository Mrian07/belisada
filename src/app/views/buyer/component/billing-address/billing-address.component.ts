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
  villageId: FormControl;
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
  adr: any = {};
  fm: any = {};
  addressId: FormControl;

  // perusahaan: Observable<any>;

  kelurahan = [];
  // bidang: Bidang[];
  categories = [];
  selectedProvince: string;

  constructor(
    private masterService: MasterService,
    private iniService: BilingAddressService,
    private billingAddressService: BilingAddressService, ) { }

  ngOnInit() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.fillForms();
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
    this.villageId = new FormControl('');
    this.postalCode = new FormControl('');
    this.addressId = new FormControl('');
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
      villageId: this.villageId,
      postalCode: this.postalCode,
      addressId: this.addressId,
    });
  }
  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      addressId: model.addressId,
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
      villageId: model.villageId.mvillageId
      // asdasd2
    };

    if (model.addressId) {

      this.iniService.update(data).subscribe(response => {

        if (response.status === '1') {
          swal(
            'Success',
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


    } else {

      this.iniService.create(data).subscribe(response => {
        if (response.status === '1') {
          swal(
            'Success',
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





  }

  fillForms() {

    this.billingAddressService.getAll().subscribe(data => {


      if (!data) {
        console.log('kosong');
      }else {
        console.log('ini data: ', data);
        // console.log('kampret luh', data[0].regionId);
        this.masterService.getCity(data[0].regionId).subscribe(city => {
          this.cities = city;
          this.masterService.getDistrict(data[0].cityId).subscribe(district => {
            this.districts = district;
            this.masterService.getVillage(data[0].districtId).subscribe(village => {

              this.villages = village;
              this.addressId.setValue(data[0].addressId);
              this.addressName.setValue(data[0].addressName);
              this.name.setValue(data[0].name);
              this.address.setValue(data[0].address);
              this.province.setValue(this.provinces.find(x => x.mregionId === data[0].regionId));
              this.city.setValue(this.cities.find(x => x.mcityId === data[0].cityId));
              this.district.setValue(this.districts.find(x => x.mdistrictId === data[0].districtId));
              this.villageId.setValue(this.villages.find(x => x.mvillageId === data[0].villageId));
              this.postalCode.setValue(data[0].postal);
              this.phone.setValue(data[0].phone);
            });
          });
        });
      }
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
