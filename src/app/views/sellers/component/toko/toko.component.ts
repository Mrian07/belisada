import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MasterService } from '../../../../core/service/master/master.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { StoreService } from '../../../../core/service/store/store.service';
import { MyStore } from '../../../../core/model/store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../../../core/model/category';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromProduct from '../../../../store/reducers';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-toko',
  templateUrl: './toko.component.html',
  styleUrls: ['./toko.component.scss']
})
export class TokoComponent implements OnInit {

  private user = JSON.parse(localStorage.user);

  createStoreForm: FormGroup;
  name: FormControl;
  address: FormControl;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  village: FormControl;
  postalcode: FormControl;
  description: FormControl;

  categories: Category[];
  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];

  isUpdate: Boolean = false;
  mBpartnerStoreId: number;

  tabs: Boolean = true;
  mystore: Observable<any>;
  stores: MyStore[];
  kelurahan = [];
  desa = [];
  code: string;
  role: any;
  selectedProvince: string;
  namaToko: string;
  alamatToko: string;
  selectedProv: any;
  selectedCity: any;
  selectedKelurahan: any;
  selectedDesa: any;
  regionId: number;

  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService,
    private masterService: MasterService,
    private routes: Router,
    private store: Store<fromProduct.Stores>,
    private title: Title
  ) {
   }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Info Toko');
    this.createFormControls();
    this.createForm();
    this.getAllStore();
    this.getProvince();
    this.fillForms();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.province = new FormControl('');
    this.city = new FormControl('');
    this.district = new FormControl('');
    this.village = new FormControl('');
    this.postalcode = new FormControl('', Validators.required);
    this.description = new FormControl('');
  }

  createForm() {
    this.createStoreForm = new FormGroup({
      name: this.name,
      address: this.address,
      province: this.province,
      city: this.city,
      district: this.district,
      village: this.village,
      postalcode: this.postalcode,
      description: this.description,
    });
  }

  fillForms() {
    this.storeService.getAll().subscribe(response => {
      if (response.length !== 0) {
        this.isUpdate = true;
        this.mBpartnerStoreId = response[0].mBpartnerStoreId;
        this.masterService.getCity(response[0].regionId).subscribe(city => {
          this.cities = city;
          this.masterService.getDistrict(response[0].cityId).subscribe(district => {
            this.districts = district;
            this.masterService.getVillage(response[0].districtId).subscribe(village => {
              this.villages = village;
              this.name.setValue(response[0].name);
              this.address.setValue(response[0].address);
              this.province.setValue(this.provinces.find(x => x.mregionId === response[0].regionId));
              this.city.setValue(this.cities.find(x => x.mcityId === response[0].cityId));
              this.district.setValue(this.districts.find(x => x.mdistrictId === response[0].districtId));
              this.village.setValue(this.villages.find(x => x.mvillageId === response[0].villageId));
              this.postalcode.setValue(response[0].postal);
              this.description.setValue(response[0].description);
            });
          });
        });
      }
    });


  }

  /**
   * Create new Store
   * triggered: when form submited
   */
  onSubmit() {
    if (this.createStoreForm.valid) {
      const model = this.createStoreForm.value;
      const data = {
        mBpartnerStoreId: this.mBpartnerStoreId,
        name: model.name,
        description: model.description,
        address: model.address,
        postal: model.postalcode,
        villageId: model.village.mvillageId,
      };

      if (this.name.value === '') {
        swal(
          'Opps!',
          'Nama tidak boleh kosong',
          'error'
        );
        return false;
      } else if (this.address.value === '') {
        swal(
          'Opps!',
          'Alamat tidak boleh kosong',
          'error'
        );
        return false;
      } else if (this.postalcode.value === '') {
        swal(
          'Opps!',
          'Kodepos tidak boleh kosong',
          'error'
        );
        return false;
      }


      if (this.isUpdate) {
        this.storeService.update(data).subscribe(response => {
          this.fillForms();
          swal('Update Sukses', 'Data berhasil diupdate', 'success');
        });
      } else {
        this.storeService.create(data).subscribe(response => {
          this.fillForms();
          swal('Simpan Sukses', 'Data berhasil didaftarkan', 'success');
        });
      }
    }
  }

  getAllStore() {
    this.storeService.getAll().subscribe(data => {
      this.stores = data;
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
    this.createStoreForm.controls['postalcode'].setValue(postalcode);
  }

  changeData() {
    this.routes.navigateByUrl('/seller/profile');
  }
}
