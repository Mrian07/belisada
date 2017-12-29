import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../../../servers/model/category';
import { Province } from '../../../../servers/model/province';
import { City } from '../../../../servers/model/city';
import { District } from '../../../../servers/model/district';
import { Village } from '../../../../servers/model/village';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { MasterService } from '../../../../servers/service/master/master.service';
import { StoreService } from '../../../../servers/service/store/store.service';
import { Store } from '../../../../servers/model/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

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

  store: Store;
  stores: Store[];

  constructor(private storeService: StoreService, private categoryService: CategoryService, private masterService: MasterService) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.getAllStore();
    this.getProvince();
  }

  createFormControls() {
    this.name = new FormControl('');
    this.address = new FormControl('');
    this.province = new FormControl('');
    this.city = new FormControl('');
    this.district = new FormControl('');
    this.village = new FormControl('');
    this.postalcode = new FormControl('');
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

  /**
   * Create new Store
   * triggered: when form submited
   */
  onSubmit() {
    if (this.createStoreForm.valid) {
      const model = this.createStoreForm.value;
      const data = {
        name: model.name,
        description: model.description,
        address: model.address,
        postal: model.postalcode,
        villageId: model.village.mvillageId,
      };
      this.storeService.create(data, {'token': this.user.token}).subscribe(response => {
        console.log('onSubmit response: ', response);
        this.store = response;
        this.createStoreForm.reset();
        this.getAllStore();
      });
    }
  }

  getAllStore() {
    this.storeService.getAll({'token': this.user.token}).subscribe(response => {
      console.log('getAllStore response: ', response);
      this.stores = response;
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
    this.createStoreForm.controls['postalcode'].setValue(postalcode);
  }
}
