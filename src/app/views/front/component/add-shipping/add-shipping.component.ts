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
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.scss']
})
export class AddShippingComponent implements OnInit {

  user = JSON.parse(localStorage.user);
  createComForm: FormGroup;
  name: FormControl;
  address: FormControl;
  addressName: FormControl;
  postalCode: FormControl;
  vilaggeId: FormControl;
  phone: FormControl;
  kampret: ShippingAddress;
  addressType: FormControl;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  id: number;
  ship;
  // village: FormControl;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];
  kelurahan = [];
  // bidang: Bidang[];
  categories = [];
  selectedProvince: string;

  constructor(private masterService: MasterService, private shipingServ: ShippingAddressService) { }

  ngOnInit() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.fillForms();
    // this.getAllStore1();
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
    this.shipingServ.create(data).subscribe(response => {
      console.log('ini submit ', response);
      this.createComForm.reset();
      if (response.status === '1') {
        swal(
          'Success',
          'Data shipping berhasil ditambahkan',
        //  response.message,
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
    const luser = JSON.parse(localStorage.getItem('user'));
    this.shipingServ.getSip(luser.token).subscribe(data => {
      this.ship = data;
           });
      }

      btnDelete(id) {
        console.log(id);
        const user = JSON.parse(localStorage.user);
        this.shipingServ.delete(id).subscribe(data => {
          this.kampret = data;
          this.fillForms();
          // alert('kampret berhasil di hapus');

          // console.log('ini', this.postrek2);
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
