import { ShippingAddressService } from './../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from './../../../../core/model/shipping-address';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('f') form: any;
  user = JSON.parse(localStorage.user);
  createComForm: FormGroup;
  name: FormControl;
  address: FormControl;
  addressName: FormControl;
  postalCode: FormControl;
  vilaggeId: FormControl;
  phone: FormControl;
  shippingAddress: ShippingAddress;
  province: FormControl;
  city: FormControl;
  isDefault: 'Y';
  district: FormControl;
  id: number;
  addressId: FormControl;
  firstActive: any;
  secondActive: any;
  ship;
  eCheck: boolean = true;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  kelurahan = [];
  categories = [];
  show: boolean = false;
  show1: boolean = true;
  selectedProvince: string;
  optionTemplate: any;
  lang: any;

  constructor(private masterService: MasterService, private shippingAddressService: ShippingAddressService) { }

  ngOnInit() {
    localStorage.setItem('languange', this.lang);
    const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    localStorage.setItem('whatever', 'something');
    const kamp3 = localStorage.getItem('whatever');
    this.getProvince();
    this.fillForms();
  }
  createFormControls() {
    this.name = new FormControl('');
    this.address = new FormControl('');
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
      addressName: model.addressName,
      phone: model.phone,
      city: model.city,
      isDefault: this.isDefault,
      province: model.province,
      district: model.district,
      postal: model.postalCode,
      villageId: model.vilaggeId.mvillageId
    };
    this.shippingAddressService.create(data).subscribe(response => {
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
    });
  }
  getAllStorex(id) {
      this.show1 = false;
      this.show = true;
      const model = this.createComForm.value;
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
  }
  edit() {
    const model = this.createComForm.value;
    const b = {
      name: model.name,
      address: model.address,
      addressName: model.addressName,
      postal: model.postalCode,
      villageId: model.vilaggeId.mvillageId,
      phone: model.phone,
      addressId: model.addressId
      //
    };
    const user = JSON.parse(localStorage.user);
    this.shippingAddressService.update(b).subscribe(data => {
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
     // location.reload();
      this.show1 = true;
      this.show = false;
      this.fillForms();
      this.createComForm.reset();
    });
  }

  iniGua(address) {
      const c = {
        name:  address.name,
        address: address.address,
        addressName: address.addressName,
        postal: address.postalCode,
        villageId: address.villageId,
        phone: address.phone,
        addressId: address.addressId,
        isDefault: 'Y'
        //
      };
      this.shippingAddressService.update(c).subscribe(data => {
        this.fillForms();
      //  alert('a');
      });

  }

  btnDelete(id) {
    swal({
      title: 'Alert!',
      text: 'Apakah data shipping ini akan dihapus',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Hapus'
    }).then((result) => {
      if (result.value) {
        this.shippingAddressService.delete(id).subscribe(data => {
          this.shippingAddress = data;
          this.fillForms();
        });
      }
    });
}

  // btnDelete(id) {
  //   const user = JSON.parse(localStorage.user);
  //   this.shippingAddressService.delete(id).subscribe(data => {
  //     this.shippingAddress = data;
  //     this.fillForms();
  //   });
  // }

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
  scroll(el) {
    el.scrollIntoView();
}

}
