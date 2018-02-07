import { ShippingAddressService } from './../../../../core/service/shipping-address/shipping-address.service';
import { BillingAddress } from './../../../../core/model/billing-address';
import { BilingAddressService } from './../../../../core/service/billing-address/biling-address.service';
import { MasterService } from './../../../../core/service/master/master.service';
import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import swal from 'sweetalert2';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareService } from '../../../../core/service/shared.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.scss']
})
export class AddBillingComponent implements OnInit {

  billingAddressList: BillingAddress[];

  //user = JSON.parse(localStorage.user);
  createComForm: FormGroup;
  name: FormControl;
  address: FormControl;
  addressName: FormControl;
  postalCode: FormControl;
  vilaggeId: FormControl;
  phone: FormControl;
  billingAddress: BillingAddress;
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
  totalbilling: number;
  optionTemplate: any;
  lang: any;

  @Output() triggerEvent = new EventEmitter<Boolean>();

  constructor(
    private masterService: MasterService,
    private ngZone: NgZone,
    private shippingAddressService: ShippingAddressService,
    private shareService: ShareService,
    private billingAddressService: BilingAddressService
  ) { }

  ngOnInit() {
    localStorage.setItem('languange', this.lang);
   // const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    this.fillForms();
  //  console.log('dn', luser);
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.addressName = new FormControl('', Validators.required);
    this.phone = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
    this.province = new FormControl('', Validators.required);
    this.district = new FormControl('', Validators.required);
    this.vilaggeId = new FormControl('', Validators.required);
    this.postalCode = new FormControl('', Validators.required);
  }
  createForm() {
    this.createComForm = new FormGroup({
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

    if (!this.createComForm.valid) {
      return;
    } else {
      const model = this.createComForm.value;
      const data = {
        name: model.name,
        address: model.address,
        addressName: model.addressName,
        phone: model.phone,
        city: model.city,
        province: model.province,
        district: model.district,
        postal: model.postalCode,
        villageId: model.vilaggeId.mvillageId
      };




      swal({
        text: 'Apakah Anda Ingin Menyimpan Alamat Penagihan Sebagai Alamat Pengiriman ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: true,
        reverseButtons: true
      }).then((result) => {

        if (result.value) {
          this.shippingAddressService.create(data).subscribe(response => {
            console.log('ini submit ', response);
            this.triggerEvent.emit(true);
            this.createComForm.reset();
            this.fillForms();
          });
          this.billingAddressService.create(data).subscribe(response => {
            console.log('ini submit ', response);
            this.triggerEvent.emit(true);
            this.createComForm.reset();
            window.location.reload();
            this.fillForms();
          });
        // result.dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        } else if (result.dismiss === 'cancel') {
           this.billingAddressService.create(data).subscribe(response => {
            console.log('ini submit ', response);
            this.triggerEvent.emit(true);
            this.createComForm.reset();
            window.location.reload();
            this.fillForms();
          });
        }



      });

      // this.billingAddressService.create(data).subscribe(response => {
      //   console.log('ini submit ', response);
      //   this.triggerEvent.emit(true);
      //   this.createComForm.reset();
      //   if (response.status === '1') {
      //     swal(
      //       'Success',
      //       'Data billing berhasil ditambahkan',
      //     //  response.message,
      //       'success'
      //     ).then(result => {
      //       location.reload();
      //     });
      //   }else {
      //     swal(
      //       'Opps!',
      //       response.message,
      //       'error'
      //     );
      //   }
      //   this.fillForms();
      // });
    }
  }

  fillForms() {
    this.billingAddressService.getAll().subscribe(data => {
      this.ship = data;
    });
  }

  btnDelete(id) {
    console.log(id);
    const user = JSON.parse(localStorage.user);
    this.billingAddressService.delete(id).subscribe(data => {
      this.billingAddress = data;
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
