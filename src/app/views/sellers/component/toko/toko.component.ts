import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  ngOnInit() {
    const user = JSON.parse(localStorage.user);
    this.role = user.role;
    this.getProvince();
    this.getCategoryOne();
    this.getAllStore();
  }

  getAllStore() {
    this.storeService.getAll().subscribe(data => {
      this.stores = data;
      if (data.length !== 0) {
        data.forEach(toko => {
          console.log(toko);
          this.namaToko = toko.name;
          this.alamatToko = toko.address;
          this.code = toko.postal;
          this.selectedProv = this.province.find(x => x.mregionId === toko.regionId);
          this.masterService.getCity(toko.regionId).subscribe(city => {
            this.city = city;
            this.selectedCity = city.find(y => y.mcityId === toko.cityId);
            this.masterService.getDistrict(toko.cityId).subscribe(kel => {
              this.kelurahan = kel;
              this.selectedKelurahan = kel.find(z => z.mdistrictId === toko.districtId);
              this.masterService.getVillage(toko.districtId).subscribe(desa => {
                this.desa = desa;
                this.selectedDesa = desa.find( a => a.mvillageId === toko.villageId);
              });
            });
          });
        });
      }
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
      console.log('city', data);
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
