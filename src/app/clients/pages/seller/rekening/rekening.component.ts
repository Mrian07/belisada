import { RekeningSService } from './../../../../servers/service/rekening/rekening-s.service';
import { FormsModule } from '@angular/forms';
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

  constructor(private searchService: SearchService, private rekeningService: RekeningSService) { }
  searchrek : any;
  postrek1: Rekening;
  postrek2: Rekening[];
  public user: Object;
  mBankId: number;
  selectedCategory;
  accountName: string;
  accountNo : string;
  token1 = this.user = JSON.parse(localStorage.user);
  token2 = this.token1.token;

  ngOnInit() {
    this.selectCity(this.mBankId);
    this.getAllStore1();
  }
  selectCity(mBankId: number) {
    this.searchService.searchRek(this.selectCity).subscribe(data => {
      this.searchrek = data;
      console.log('ini nih token',this.token1.token);
    });
  }
  getAllStore1() {
    const user = JSON.parse(localStorage.user);
    this.rekeningService.getAll({'token': user.token}).subscribe(data => {
      this.postrek2 = data;
    });
  }
  getAllStore() {
    console.log('this.selectedCategory: ', this.selectedCategory.mbankId);
    const a = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.selectedCategory.mbankId
    }
    const user = JSON.parse(localStorage.user);
    this.rekeningService.create(a, {'token': user.token}).subscribe(data => {
      this.postrek1 = data;
     
    });
    location.reload();
  }

  getalat() {
    const registernih = {
      accountNo : this.accountNo,
      accountName : this.accountName,
      mBankId : this.mBankId
    };
    this.searchService.postRek(this.token2).subscribe(data => {
      console.log('sukes cuy');
  });
  }
 
  

}
