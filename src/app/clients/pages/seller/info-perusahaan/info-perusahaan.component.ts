import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { MasterService } from '../../../../servers/service/master/master.service';

@Component({
  selector: 'app-info-perusahaan',
  templateUrl: './info-perusahaan.component.html',
  styleUrls: ['./info-perusahaan.component.scss']
})
export class InfoPerusahaanComponent implements OnInit {

  constructor(private masterService: MasterService, private categoryService: CategoryService) { }

  province = [];
  city = [];
  kelurahan = [];
  categories = [];
  selectedProvince: string;

  ngOnInit() {
    this.getProvince();
    this.getCategoryOne();
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

  getCategoryOne() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.categories = data;
    });
  }
  selectCategories(id: number) {
    console.log(id);
  }
}
