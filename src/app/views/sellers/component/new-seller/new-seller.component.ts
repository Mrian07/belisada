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
import * as fromActions from '../../../../store/actions';
import { RekeningSService } from '../../../../core/service/rekening/rekening-s.service';

import { RegisterService } from '../../../../core/service/register/register.service';

@Component({
  selector: 'app-new-seller',
  templateUrl: './new-seller.component.html',
  styleUrls: ['./new-seller.component.scss']
})
export class NewSellerComponent implements OnInit {

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

  accountNo: FormControl;
  mbankId: FormControl;
  accountName: FormControl;

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

  searchrek: any;
  rekening: Observable<any>;
  selectedCategory: any;

  token: any;

  constructor(
    private registerService: RegisterService,
    private rekeningService: RekeningSService,
    private storeService: StoreService,
    private categoryService: CategoryService,
    private masterService: MasterService,
    private routes: Router,
    private store: Store<fromProduct.Stores>,
    private storeBank: Store<fromProduct.Banks>,
    private title: Title
  ) {
   }

  ngOnInit() {
    this.title.setTitle('Belisada Seller - Info Toko');
    this.createFormControls();
    this.createForm();
    this.getAllStore();
    this.getProvince();
    // this.fillForms();
    this.fineStore();
    this.selectBank();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.province = new FormControl('', Validators.required);
    this.city = new FormControl('', Validators.required);
    this.district = new FormControl('', Validators.required);
    this.village = new FormControl('', Validators.required);
    this.postalcode = new FormControl('', Validators.required);
    this.description = new FormControl('');

    this.accountNo = new FormControl('', Validators.required);
    this.mbankId = new FormControl('', Validators.required);
    this.accountName = new FormControl('', Validators.required);
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

      accountNo: this.accountNo,
      mbankId: this.mbankId,
      accountName: this.accountName,
    });
  }

  fineStore() {
    this.storeService.getAll().subscribe(response => {
      console.log('getAllStore response: ', response);
      this.stores = response;

      if (this.stores.length === 0) {
        this.routes.navigateByUrl('/seller/dashboard');
      }

    });

  }

  /**
   * Create new Store
   * triggered: when form submited
   */
  onSubmit() {

    if (!this.createStoreForm.valid) {
      return;
    } else {
      console.log('onSubmit');
      const model = this.createStoreForm.value;
      const dataStore = {
        mBpartnerStoreId: this.mBpartnerStoreId,
        name: model.name,
        description: model.description,
        address: model.address,
        postal: model.postalcode,
        villageId: model.village.mvillageId,
      };

      const dataBank = {
        accountNo: model.accountNo,
        accountName: model.accountName,
        mBankId: model.mbankId.mbankId,
      };

      this.registerService.check(model.name).subscribe(hasil => {
        if (hasil.status === '0') {
          this.storeService.create(dataStore).subscribe(response => {});
          this.rekeningService.create(dataBank).subscribe(data => {});

          swal({
            title: 'Pendaftaran Sukses!',
            text: 'Selamat pendaftaran toko Anda berhasil, selanjutnya silakan menunggu konfirmasi aktifasi toko Anda.',
            type: 'success',
            confirmButtonColor: '#1d7d0a',
            confirmButtonText: 'Tutup'
          }).then((result) => {
            if (result.value) {
                this.routes.navigateByUrl('/seller/dashboard');
            } else {
                return false;
            }
          });
        } else {
          swal(
              'Info!',
              'Nama toko sudah digunakan, silakan masukan nama yang lain',
              'warning'
          )
        }
      });

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

  selectBank() {
    this.masterService.getBankList().subscribe(data => {
      this.searchrek = data;
    });

  }

  getBankList() {
    this.rekening = this.store.select<any>(fromProduct.getBankState);
  }
}
