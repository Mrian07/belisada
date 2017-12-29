import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../../servers/model/store';
import { StoreService } from './../../../../servers/service/store/store.service';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { MasterService } from '../../../../servers/service/master/master.service';

@Component({
  selector: 'app-toko',
  templateUrl: './toko.component.html',
  styleUrls: ['./toko.component.scss']
})
export class TokoComponent implements OnInit {

  constructor(private masterService: MasterService, private categoryService: CategoryService, private storeService: StoreService) { }

  store: Store;
  stores: Store[];
  province = [];
  city = [];
  kelurahan = [];
  desa = [];
  categories = [];
  code: number;
  selectedProvince: string;

  ngOnInit() {
    this.getProvince();
    this.getCategoryOne();
    this.getAllStore();
  }

  getAllStore() {
    const user = JSON.parse(localStorage.user);
    this.storeService.getAll({'token': user.token}).subscribe(data => {
      this.stores = data;
    });
  }

  getProvince() {
    this.masterService.getProvince('209').subscribe(data => {
      this.province = data;
    });
  }

  selectCity(id) {
    this.masterService.getCity(id).subscribe(data => {
      this.city = data;
    });
  }

  selectKelurahan(id) {
    this.masterService.getDistrict(id).subscribe(data => {
      this.kelurahan = data;
    });
  }

  selectDesa(id) {
    this.masterService.getVillage(id).subscribe(data => {
      this.desa = data;
    });
  }

  postal(code) {
    this.code = code;
  }

  getCategoryOne() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categories = data;
    });
  }

  selectCategories(id: number) {
    console.log(id);
  }
}
