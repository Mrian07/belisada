import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../servers/service/search/search.service';
import { CategoryService } from '../../../../servers/service/category/category.service';

@Component({
  selector: 'app-toko',
  templateUrl: './toko.component.html',
  styleUrls: ['./toko.component.scss']
})
export class TokoComponent implements OnInit {

  constructor(private searchService: SearchService, private categoryService: CategoryService) { }


  propinsi = [];
  city = [];
  kelurahan = [];
  desa = [];
  categories = [];
  code: number;
  selectedProvince: string;

  ngOnInit() {
    this.getPropinsi();
    this.getCategoryOne();
  }

  getPropinsi() {
    this.searchService.searchProvince('209').subscribe(data => {
      this.propinsi = data;
    });
  }

  selectCity(id) {
    this.searchService.searchCity(id).subscribe(data => {
      this.city = data;
    });
  }

  selectKelurahan(id) {
    this.searchService.searchKelurahan(id).subscribe(data => {
      this.kelurahan = data;
    });
  }

  selectDesa(id) {
    this.searchService.searchDesa(id).subscribe(data => {
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
