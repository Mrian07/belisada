import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../../core/service/shared.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { ShippingAddressService } from './../../../../core/service/shipping-address/shipping-address.service';
import { BilingAddressService } from './../../../../core/service/billing-address/biling-address.service';
import { ShippingAddress } from './../../../../core/model/shipping-address';
import { MasterService } from './../../../../core/service/master/master.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import swal from 'sweetalert2';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit-billing.component.html',
  styleUrls: ['./edit-billing.component.scss']
})
export class EditBillingComponent implements OnInit {

  shipList: any;

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
  isDefault: 'Y';
  district: FormControl;
  id: number;
  addressId: FormControl;
  firstActive: any;
  secondActive: any;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  kelurahan = [];
  categories = [];
  selectedProvince: string;

  constructor(
    private sharedService: ShareService,
    private masterService: MasterService,
    private bilingAddressService: BilingAddressService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.fillForms();
  }

  onSubmit() {

    const model = this.createComForm.value;
    const b = {
      name: model.name,
      address: model.address,
      addressName: model.addressName,
      postal: model.postalCode,
      villageId: model.vilaggeId.mvillageId,
      phone: model.phone,
      addressId: model.addressId
    };
    const user = JSON.parse(localStorage.user);
    this.bilingAddressService.update(b).subscribe(data => {
      location.reload();
    });

  }

  fillForms() {
    this.shipList = this.sharedService.shareData;
    console.log('inilaoh', this.shipList);
    this.getAllStorex(this.shipList);
  }

  createFormControls() {
    this.name = new FormControl('');
    this.address = new FormControl('');
    this.addressType = new FormControl('');
    this.addressName = new FormControl('');
    this.phone = new FormControl('');
    this.city = new FormControl('');
    this.addressId = new FormControl('');
    this.province = new FormControl('');
    this.district = new FormControl('');
    this.vilaggeId = new FormControl('');
    this.postalCode = new FormControl('');
  }

  createForm() {
    this.createComForm = new FormGroup({
      addressId: this.addressId,
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


  getAllStorex(id) {
    const model = this.createComForm.value;
    this.masterService.getProvince('209').subscribe(data => {
      this.provinces = data;
        this.masterService.getCity(id.regionId).subscribe(city => {
        this.cities = city;
        this.masterService.getDistrict(id.cityId).subscribe(district => {
        this.districts = district;
        this.masterService.getVillage(id.districtId).subscribe(village => {
        this.villages = village;
        this.addressName.setValue(id.addressName);
        this.addressId.setValue(id.addressId);
        this.name.setValue(id.name);
        this.address.setValue(id.address);
        this.province.setValue(this.provinces.find(x => x.mregionId === id.regionId));
        this.city.setValue(this.cities.find(x => x.mcityId === id.cityId));
        this.district.setValue(this.districts.find(x => x.mdistrictId === id.districtId));
        this.vilaggeId.setValue(this.villages.find(x => x.mvillageId === id.villageId));
        this.postalCode.setValue(id.postal);
        this.phone.setValue(id.phone);
          });
        });
      });
    });
  }

  getProvince() {
    this.masterService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  getCity(id) {
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
