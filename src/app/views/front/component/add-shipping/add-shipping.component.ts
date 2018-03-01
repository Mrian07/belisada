import { ShippingAddressService } from './../../../../core/service/shipping-address/shipping-address.service';
import { ShippingAddress } from './../../../../core/model/shipping-address';
import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';
import { MasterService } from './../../../../core/service/master/master.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import swal from 'sweetalert2';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShareService } from '../../../../core/service/shared.service';
import { FlagService } from '../../../../core/service/flag.service';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.scss']
})
export class AddShippingComponent implements OnInit {

  shippingAddressList: ShippingAddress[];
  optionTemplate: any;
  //user = JSON.parse(localStorage.user);
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
  lang: any;

  @Output() triggerEvent = new EventEmitter<Boolean>();

  constructor(
    private masterService: MasterService,
    private ngZone: NgZone,
    private shareService: ShareService,
    private shippingAddressService: ShippingAddressService,
    private flagService: FlagService
  ) { }

  ngOnInit() {
    localStorage.setItem('languange', this.lang);
   // const luser = JSON.parse(localStorage.getItem('user'));
    this.createFormControls();
    this.createForm();
    this.getProvince();
    // this.getProvince(this.fillForms.bind(this));
    this.fillForms();
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
        villageId: model.vilaggeId.mvillageId,
        isDefault: 'Y'
      };
      this.shippingAddressService.create(data).subscribe(response => {
        this.triggerEvent.emit(true);

        this.createComForm.reset();
        this._markFormPristine(this.createComForm);
        if (response.status === '1') {
          swal(
            'Success',
            'Data pengiriman berhasil ditambahkan',
          //  response.message,
            'success',
          ).then(); {
            this.flagService.changeMessage('add-shipping');

            //location.reload();
          }
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
  }

  fillForms() {
    this.shippingAddressService.getAll().subscribe(data => {
      this.ship = data;
    });
  }

  btnDelete(id) {
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

    // this.masterService.getProvince('209').subscribe(data => {
    //   this.provinces = data;
    //   if(typeof cb=='function') cb();
    // });

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

  private _markFormPristine(form: FormGroup): void {
    // console.log('form:before ', form);
    Object.keys(form.controls).forEach(control => {
        form.controls[control].markAsPristine();
    });
    // console.log('form:after ', form);
  }

}
