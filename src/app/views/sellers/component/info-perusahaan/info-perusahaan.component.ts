import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/service/master/master.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Province } from '../../../../core/model/province';
import { City } from '../../../../core/model/city';
import { District } from '../../../../core/model/district';
import { Village } from '../../../../core/model/village';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-info-perusahaan',
  templateUrl: './info-perusahaan.component.html',
  styleUrls: ['./info-perusahaan.component.scss']
})
export class InfoPerusahaanComponent implements OnInit {

  createComForm: FormGroup;
  province: FormControl;
  city: FormControl;
  district: FormControl;
  village: FormControl;
  siup: FormControl;
  tdp: FormControl;

  corporateName: FormControl;
  address: FormControl;
  corporatePhone: FormControl;
  postalcode: FormControl;

  provinces: Province[];
  cities: City[];
  districts: District[];
  villages: Village[];

  kelurahan = [];
  categories = [];
  selectedProvince: string;

  constructor(private masterService: MasterService, private categoryService: CategoryService) { }

  ngOnInit() {
    // this.getProvince();
    this.getCategoryOne();
    this.createFormControls();
    this.createForm();
    this.getProvince();
  }

  // getProvince() {
  //   this.masterService.getProvince('209').subscribe(data => {
  //     this.province = data;
  //   });
  // }

  // selectCity(id) {
  //   this.masterService.getCity(id).subscribe(data => {
  //     this.city = data;
  //   });
  // }

  // selectKelurahan(id) {
  //   this.masterService.getDistrict(id).subscribe(data => {
  //     this.kelurahan = data;
  //   });
  // }

  getCategoryOne() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categories = data;
    });
  }
  selectCategories(id: number) {
    console.log(id);
  }


  createFormControls() {
    this.corporateName = new FormControl('');
    this.address = new FormControl('');
    this.province = new FormControl('');
    this.city = new FormControl('');
    this.district = new FormControl('');
    this.village = new FormControl('');
    this.corporatePhone = new FormControl('');
    this.siup = new FormControl('');
    this.postalcode = new FormControl('');
    this.tdp = new FormControl('');
  }

  createForm() {
    this.createComForm = new FormGroup({
      corporateName: this.corporateName,
      address: this.address,
      province: this.province,
      city: this.city,
      district: this.district,
      village: this.village,
      corporatePhone: this.corporatePhone,
      postalCode: this.postalcode,
      siup: this.siup,
      tdp: this.tdp,
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
