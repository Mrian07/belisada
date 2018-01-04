import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../core/service/master/master.service';
import { CategoryService } from '../../../../core/service/category/category.service';
import { StoreService } from '../../../../core/service/store/store.service';
import { MyStore } from '../../../../core/model/store';


@Component({
  selector: 'app-toko',
  templateUrl: './toko.component.html',
  styleUrls: ['./toko.component.scss']
})
export class TokoComponent implements OnInit {

  constructor(private masterService: MasterService,
    private categoryService: CategoryService,
    private storeService: StoreService) { }

  store: MyStore;
  stores: MyStore[];
  province = [];
  city = [];
  kelurahan = [];
  desa = [];
  categories = [];
  code: number;
  role: any;
  selectedProvince: string;

  ngOnInit() {
    const user = JSON.parse(localStorage.user);
    this.role = user.role;
    this.getProvince();
    this.getCategoryOne();
    this.getAllStore();
  }

  getAllStore() {
    // const a ={
    //   this.desa =
    // }
    const user = JSON.parse(localStorage.user);
    this.storeService.getAll().subscribe(data => {
      this.stores = data;
      console.log(this.stores)
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
