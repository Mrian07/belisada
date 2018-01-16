import { ShippingAddressService } from './../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from './../../../../core/model/shipping-address';
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../../core/service/master/master.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import swal from 'sweetalert2';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  user = JSON.parse(localStorage.user);
  createComForm: FormGroup;
  name: FormControl;
  address: FormControl;
  addressName: FormControl;
  postalCode: FormControl;
  vilaggeId: FormControl;
  phone: FormControl;
  shippingAddress: ShippingAddress;
  addressType: FormControl;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  id: number;
  ship;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  kelurahan = [];
  categories = [];
  selectedProvince: string;

  constructor(private masterService: MasterService, private shippingAddressService: ShippingAddressService) { }

  ngOnInit() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.fillForms();
    console.log('dn', luser);
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
      name: model.name,
      address: model.address,
      addressType: model.addressType,
      addressName: model.addressName,
      phone: model.phone,
      city: model.city,
      province: model.province,
      district: model.district,
      postal: model.postalCode,
      villageId: model.vilaggeId.mvillageId
    };
    this.shippingAddressService.create(data).subscribe(response => {
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
      this.fillForms();
    });
  }
  fillForms() {
    this.shippingAddressService.getAll().subscribe(data => {
      this.ship = data;
      console.log('ah elah', data);
    });
  }
  getAllStorex(id) {
    const model = this.createComForm.value;
    //
    this.masterService.getCity(id.regionId).subscribe(city => {
      this.cities = city;
      this.masterService.getDistrict(id.cityId).subscribe(district => {
        this.districts = district;
        this.masterService.getVillage(id.districtId).subscribe(village => {

          this.villages = village;
          this.addressName.setValue(id.addressName);
          this.name.setValue(id.name);
          this.address.setValue(id.address);
          this.province.setValue(this.provinces.find(x => x.mregionId === id.regionId));
          this.city.setValue(this.cities.find(x => x.mcityId === id.cityId));
          // this.sectorTypeId.setValue(this.bidang.find(x => x.sectorTypeId === data.sectorTypeId));
          // this.city.setValue(data.cityId);
          this.district.setValue(this.districts.find(x => x.mdistrictId === id.districtId));
          this.vilaggeId.setValue(this.villages.find(x => x.mvillageId === id.villageId));
          this.postalCode.setValue(id.postal);
          // this.corporatePhone.setValue(data.corporatePhone);
          // this.ktp.setValue(data.idcard);
          // this.corporateNpwp.setValue(data.corporateNpwp);
          // this.imgAvatar.setValue(data.imageAvatar);
          // this.imageCorporateNpwp.setValue(data.imageCorporateNpwp);
          // this.dateOfBirth = new FormControl(new Date());
          // this.dateOfBirth.setValue(data.dateOfBirth);
        });
      });
    });
    // this.name = id.name;
    // this.accountNo = id.accountNo;
    // this.selectedCategory = id.mBankId;
    // this.mBankAccountId = id.mBankAccountId;
    // this.show1 = false;
    console.log('ini semuanya', id);
  }

  btnDelete(id) {
    console.log(id);
    const user = JSON.parse(localStorage.user);
    this.shippingAddressService.delete(id).subscribe(data => {
      this.shippingAddress = data;
      this.fillForms();
    });
  }

  getProvince() {
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
