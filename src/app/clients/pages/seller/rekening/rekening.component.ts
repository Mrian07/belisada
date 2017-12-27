import { Rekening } from './../../../../servers/model/rekening';
import { SearchService } from './../../../../servers/service/search/search.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../servers/service/profile/profile.service';

@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {

  constructor(private searchService: SearchService) { }
  searchrek = [];
  ngOnInit() {
    this.selectCity();
  }
  selectCity() {
    this.searchService.searchRek().subscribe(data => {
      this.searchrek = data;
    });
  }

}
