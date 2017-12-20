import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../servers/service/search/search.service';

@Component({
  selector: 'app-info-perusahaan',
  templateUrl: './info-perusahaan.component.html',
  styleUrls: ['./info-perusahaan.component.scss']
})
export class InfoPerusahaanComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  propinsi = [];
  city = [];
  kelurahan = [];
  selectedProvince: string;

  ngOnInit() {
    this.getPropinsi();
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
}
