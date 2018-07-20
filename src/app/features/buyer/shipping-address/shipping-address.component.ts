import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { StoreService } from '@belisada/core/services';
import { AddressService } from './../../../core/services/address/address.service';
import { AddShippingRequest, SetDefault, GetShippingResponse, EditShippingRequest } from '@belisada/core/models/address/address.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  list: GetShippingResponse[];
  public formAddCrtl: FormGroup;
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];

  simpan_sebagai: FormControl;
  penerima: FormControl;
  hp: FormControl;
  kodepos: FormControl;
  alamat: FormControl;
  addId: number;

  isList: boolean;
  isAdd: boolean;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private addressService: AddressService,
  ) { }

  ngOnInit() {
    this.statusFlag();
    this.isList = true;
    this.listShipping();
  }

  statusFlag() {
    this.isList = false;
    this.isAdd = false;
    this.isEdit = false;
  }

  setDefault(id) {
    const data = new SetDefault();
    data.addressId = id;
    this.addressService.defaultShipping(data).subscribe(respon => {
      this.ngOnInit();
    });
  }

  deleteShipping(id) {

    swal({
      title: 'Alert',
      text: 'Apakah Anda yakin alamat ini akan dihapus?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus!',
      cancelButtonText: 'Batalkan'
    }).then((result) => {
      if (result.value === true) {
        this.addressService.deleteShipping(id).subscribe(respon => {
          this.ngOnInit();
        });
      }
    });

  }

  phoneCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  editShipping(id) {
    const data = this.list.find(x => x.addressId === id);
    this.formAddCrtl = this.fb.group({
      addId: new FormControl(data.addressId, Validators.required),
      simpan_sebagai: new FormControl(data.addressName, Validators.required),
      penerima: new FormControl(data.name, Validators.required),
      hp: new FormControl(data.phone, [Validators.required, Validators.maxLength(15)]),
      kodepos: new FormControl(data.postal, [Validators.required, Validators.minLength(5)]
      ),
      province: new FormControl(data.regionId, Validators.required),
      city: new FormControl(data.cityId, Validators.required),
      district: new FormControl(data.districtId, Validators.required),
      villageId: new FormControl(data.villageId,
          Validators.required,
      ),
      alamat: new FormControl(data.address, Validators.required),
    });

    this.statusFlag();
    this.isAdd = true;
    this.isEdit = true;
    this.getProvince();
    this.onChanges();
    // console.log('a: ', data);
    // this.list = data;
  }

  listShipping() {
    this.addressService.getShipping().subscribe(respon => {
      this.list = respon;
    });
  }

  add() {
    this.statusFlag();
    this.isAdd = true;
    this.getForm();
    this.getProvince();
    this.onChanges();
  }

  back() {
    this.statusFlag();
    this.isList = true;
  }

  getForm() {
    this.formAddCrtl = this.fb.group({
      addId: new FormControl(null),
      simpan_sebagai: new FormControl(null, Validators.required),
      penerima: new FormControl(null, Validators.required),
      hp: new FormControl(null, Validators.required),
      kodepos: new FormControl(null, [Validators.required, Validators.minLength(5)]
      ),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      villageId: new FormControl(null,
          Validators.required,
      ),
      alamat: new FormControl(null, Validators.required),
    });
  }

  isFieldValid(field: string) {
    return !this.formAddCrtl.get(field).valid && this.formAddCrtl.get(field).touched;
  }

  onSent() {

    if (this.formAddCrtl.valid) {

      if (this.formAddCrtl.value.addId) {
        const data = new EditShippingRequest();
        data.addressId = this.formAddCrtl.value.addId;
        data.address = this.formAddCrtl.value.alamat;
        data.addressName = this.formAddCrtl.value.simpan_sebagai;
        data.isDefault = false;
        data.name = this.formAddCrtl.value.penerima;
        data.phone = this.formAddCrtl.value.hp;
        data.postal = this.formAddCrtl.value.kodepos;
        data.villageId = this.formAddCrtl.value.villageId;

        this.addressService.editShipping(data).subscribe(respon => {
          if (respon.status === 1) {
            this.statusFlag();
            this.listShipping();
            this.isList = true;
          }
        });
      } else {
        const data = new AddShippingRequest();
        data.address = this.formAddCrtl.value.alamat;
        data.addressName = this.formAddCrtl.value.simpan_sebagai;
        data.isDefault = false;
        data.name = this.formAddCrtl.value.penerima;
        data.phone = this.formAddCrtl.value.hp;
        data.postal = this.formAddCrtl.value.kodepos;
        data.villageId = this.formAddCrtl.value.villageId;

        this.addressService.addShipping(data).subscribe(respon => {
          if (respon.status === 1) {
            this.statusFlag();
            this.listShipping();
            this.isList = true;
          }
        });
      }

    } else {
      this.validateAllFormFields(this.formAddCrtl);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
  }

  onChanges() {
    this.formAddCrtl.get('province').valueChanges.subscribe(val => {
        this.getCity(val);
    });
    this.formAddCrtl.get('city').valueChanges.subscribe(val => {
        this.getDistrict(val);
    });

    this.formAddCrtl.get('district').valueChanges.subscribe(val => {
        this.getVillage(val);
    });

    this.formAddCrtl.get('villageId').valueChanges.subscribe(val => {
      const postalCode = this.villages.find(x => x.villageId === val).postal;
      this.formAddCrtl.patchValue(
        {
          kodepos: postalCode,
        });
    });
  }

  getProvince() {
    this.storeService.getProvince('209').subscribe(data => {
        this.provinces = data;
    });
  }

  getCity(id) {
      this.storeService.getCity(id).subscribe(data => {
          this.cities = data;
      });
  }
  getDistrict(id) {
      this.storeService.getDistrict(id).subscribe(data => {
          this.districts = data;
      });
  }

  getVillage(id) {
      this.storeService.getVillage(id).subscribe(data => {
          this.villages = data;
          const model = this.formAddCrtl.value;
          const a = this.formAddCrtl.value.villageId = id.district;
      });
  }


}
