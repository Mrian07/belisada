import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../../core/model/category';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { StoreService } from '../../../../core/service/store/store.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { MasterService } from '../../../../core/service/master/master.service';
import * as fromActions from '../../../../store/actions';
import * as fromProduct from '../../../../store/reducers';
import { ProductComponent } from '../product/product.component';
import { MyStore } from '../../../../core/model/store';



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

  stores: any;
  tabs: Boolean = true;
  mystore: Observable<any>;

  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService,
    private masterService: MasterService,
    private routes: Router,
    private store: Store<fromProduct.Stores>
  ) {
   }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.getAllStore();
    this.getProvince();
    this.mystore = this.store.select(fromProduct.getStoreState);
    console.log(this.mystore);
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
        this.createStoreForm.reset();
        this.getAllStore();
      });
    }
  }

  getAllStore() {
    this.storeService.getAll({'token': this.user.token}).subscribe(response => {
      console.log('getAllStore response: ', response);
      this.stores = response;
      // this.store.dispatch(new storeAction.GetStore(response));
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

  changeData() {
    this.routes.navigateByUrl('/seller/profile');
  }
}